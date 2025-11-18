"use client";

import { useState } from "react";
import Link from "next/link";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-white p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors mb-8"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h1 className="text-5xl font-black uppercase mb-4">To-Do List</h1>
          <p className="text-xl font-bold uppercase">
            Simple and effective task management
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="ADD NEW TASK..."
            className="flex-1 border-8 border-black px-6 py-4 text-xl font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-yellow-100"
          />
          <button
            onClick={addTodo}
            className="bg-black text-white border-8 border-black px-12 py-4 text-xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border-8 border-black p-4 bg-blue-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase">Total</div>
            <div className="text-4xl font-black">{todos.length}</div>
          </div>
          <div className="border-8 border-black p-4 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase">Active</div>
            <div className="text-4xl font-black">{activeTodos}</div>
          </div>
          <div className="border-8 border-black p-4 bg-green-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase">Done</div>
            <div className="text-4xl font-black">{completedTodos}</div>
          </div>
        </div>

        {todos.length > 0 && (
          <>
            <div className="border-8 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`border-b-4 border-black last:border-b-0 p-4 flex items-center gap-4 ${
                    todo.completed ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center font-black text-xl cursor-pointer hover:bg-gray-100 ${
                      todo.completed ? "bg-green-400" : "bg-white"
                    }`}
                  >
                    {todo.completed && "✓"}
                  </button>
                  <span
                    className={`flex-1 text-lg font-bold ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="border-4 border-black bg-red-500 text-white px-4 py-2 font-black uppercase text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {completedTodos > 0 && (
              <button
                onClick={clearCompleted}
                className="w-full border-8 border-black bg-red-500 text-white px-8 py-4 font-black uppercase text-xl hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
              >
                Clear Completed ({completedTodos})
              </button>
            )}
          </>
        )}

        {todos.length === 0 && (
          <div className="border-8 border-black p-16 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-6xl mb-4">📝</div>
            <div className="text-2xl font-black uppercase text-gray-400">
              No tasks yet. Add one above!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
