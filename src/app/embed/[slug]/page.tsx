import { getWidgetBySlug, widgets } from "@/lib/widgets-data";
import ProjectProgressWidget from "@/components/embed/widgets/project-progress";
import ProgressBarWidget from "@/components/embed/widgets/progress-bar";
import HabitCounterWidget from "@/components/embed/widgets/habit-counter";
import CounterWidget from "@/components/embed/widgets/counter-widget";
import PageViewWidget from "@/components/embed/widgets/page-view";
import WordClockWidget from "@/components/embed/widgets/word-clock";
import LifeProgressWidget from "@/components/embed/widgets/life-progress";
import CountdownTimerWidget from "@/components/embed/widgets/countdown-timer";
import WorldClockWidget from "@/components/embed/widgets/world-clock";
import ButtonWidget from "@/components/embed/widgets/button-widget";
import UpvoteButtonWidget from "@/components/embed/widgets/upvote-button";
import LikeButtonWidget from "@/components/embed/widgets/like-button";
import TodoListWidget from "@/components/embed/widgets/todo-list";
import InspirationalQuotesWidget from "@/components/embed/widgets/inspirational-quotes";
import ProjectProgressBizWidget from "@/components/embed/widgets/project-progress-biz";

// Helper: find widget by id or slug
function findWidget(slug: string, widgetId?: string) {
  if (widgetId) {
    return widgets.find((w) => w.id === widgetId) ?? getWidgetBySlug(slug);
  }
  return getWidgetBySlug(slug);
}

// Helper: parse config from search params
function parseConfig(sp: Record<string, string | string[] | undefined>, widget: ReturnType<typeof findWidget>) {
  const config: Record<string, string> = {};
  widget?.configSchema.forEach((field) => {
    const val = sp[field.key];
    config[field.key] = typeof val === "string" ? val : String(field.default);
  });
  return config;
}

// This route renders widget iframes for embedding in Notion
export default async function WidgetEmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const widgetId = typeof sp.widgetId === "string" ? sp.widgetId : undefined;
  const widget = findWidget(slug, widgetId);

  if (!widget) {
    return (
      <div style={{ padding: "20px", fontFamily: "system-ui", textAlign: "center" }}>
        <p style={{ color: "#6b7280" }}>Widget not found</p>
      </div>
    );
  }

  const config = parseConfig(sp, widget);

  // Route to the correct widget component based on widget id
  switch (widget.id) {
    // COUNTERS
    case "project-progress":
      return (
        <ProjectProgressWidget
          projectName={config.projectName}
          progress={Number(config.progress)}
          color={config.color}
        />
      );

    case "progress-bar":
      return (
        <ProgressBarWidget
          title={config.title}
          startDate={config.startDate}
          endDate={config.endDate}
          color={config.color}
        />
      );

    case "habit-counter":
      return (
        <HabitCounterWidget
          habitName={config.habitName}
          goal={Number(config.goal)}
        />
      );

    case "counter":
      return (
        <CounterWidget
          label={config.label}
          initialValue={Number(config.initialValue)}
        />
      );

    case "page-view":
      return <PageViewWidget label={config.label} />;

    case "word-clock":
      return <WordClockWidget />;

    case "year-month-week-day-progress":
      return (
        <LifeProgressWidget
          title={config.title}
          birthDate={config.birthDate}
          timezone={config.timezone}
          showLife={config.showLife !== "false"}
          showYear={config.showYear !== "false"}
          showMonth={config.showMonth !== "false"}
          showWeek={config.showWeek !== "false"}
          showDay={config.showDay !== "false"}
        />
      );

    case "simple-count-down":
      return <CountdownTimerWidget targetDate={config.targetDate} />;

    case "world-clock":
      return <WorldClockWidget timezone={config.timezone} />;

    // BUTTONS
    case "button":
      return (
        <ButtonWidget
          label={config.label}
          url={config.url}
          color={config.color}
        />
      );

    case "upvote-button":
      return <UpvoteButtonWidget />;

    case "like-button":
      return <LikeButtonWidget />;

    // PRODUCTIVITY
    case "todo":
      return <TodoListWidget />;

    case "inspirational-quotes":
      return <InspirationalQuotesWidget />;

    // BUSINESS
    case "project-progress-biz":
      return (
        <ProjectProgressBizWidget
          projectName={config.projectName}
          progress={Number(config.progress)}
          color={config.color}
        />
      );

    default:
      return (
        <div style={{ padding: "20px", fontFamily: "system-ui", textAlign: "center" }}>
          <p style={{ color: "#6b7280" }}>Widget type not yet implemented</p>
        </div>
      );
  }
}
