import { notFound } from "next/navigation";
import { getWidgetBySlug, widgets } from "@/lib/widgets-data";
import { WidgetConfigurator } from "@/components/widgets/WidgetConfigurator";
import type { Metadata } from "next";

export function generateStaticParams() {
  return widgets.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) return { title: "Widget Not Found" };
  return {
    title: `Configure ${widget.name} | embedkit`,
    description: widget.description,
  };
}

export default async function WidgetConfiguratorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);

  if (!widget) {
    notFound();
  }

  return <WidgetConfigurator widget={widget} />;
}
