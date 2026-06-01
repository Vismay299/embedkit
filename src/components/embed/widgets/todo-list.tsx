"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Review project proposal", done: false },
  { id: 2, text: "Update documentation", done: false },
  { id: 3, text: "Plan sprint tasks", done: true },
];

export default function TodoListWidget() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  const [newText, setNewText] = useState("");
  const [nextId, setNextId] = useState(4);

  const addTodo = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, { id: nextId, text: trimmed, done: false }]);
    setNextId(id => id + 1);
    setNewText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTodo();
  };

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px",
      background: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      minWidth: "260px",
      maxWidth: "420px",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "14px",
      }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>
          📝 To-Do
        </span>
        <span style={{
          fontSize: "13px",
          color: "#6b7280",
          fontWeight: 500,
        }}>
          {doneCount}/{todos.length} done
        </span>
      </div>

      {/* Progress */}
      {todos.length > 0 && (
        <div style={{
          width: "100%",
          height: "4px",
          background: "#f3f4f6",
          borderRadius: "2px",
          overflow: "hidden",
          marginBottom: "14px",
        }}>
          <div style={{
            width: `${(doneCount / todos.length) * 100}%`,
            height: "100%",
            background: doneCount === todos.length ? "#22c55e" : "#0D9488",
            borderRadius: "2px",
            transition: "width 0.3s ease",
          }} />
        </div>
      )}

      {/* List */}
      <div style={{ marginBottom: "12px", maxHeight: "240px", overflowY: "auto" }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "8px",
              marginBottom: "4px",
              background: todo.done ? "#f9fafb" : "#ffffff",
              transition: "background 0.15s ease",
            }}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "6px",
                border: todo.done ? "2px solid #22c55e" : "2px solid #d1d5db",
                background: todo.done ? "#22c55e" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
                flexShrink: 0,
                padding: 0,
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {todo.done ? "✓" : ""}
            </button>
            <span style={{
              flex: 1,
              fontSize: "14px",
              color: todo.done ? "#9ca3af" : "#374151",
              textDecoration: todo.done ? "line-through" : "none",
              transition: "all 0.15s ease",
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#d1d5db",
                padding: "2px 4px",
                borderRadius: "4px",
                transition: "all 0.15s ease",
                lineHeight: 1,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.background = "#fef2f2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#d1d5db";
                e.currentTarget.style.background = "transparent";
              }}
            >
              ✕
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#9ca3af", fontSize: "14px" }}>
            All done! 🎉
          </div>
        )}
      </div>

      {/* Add input */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
            transition: "border-color 0.15s ease",
            color: "#374151",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#0D9488";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#0D9488",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#0F766E";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#0D9488";
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
