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
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">To-Do List</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Simple and effective task management
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="ADD NEW TASK..."
            className="flex-1 border-4 sm:border-8 border-black px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-yellow-100"
          />
          <button
            onClick={addTodo}
            className="bg-black text-white border-4 sm:border-8 border-black px-10 py-3 sm:px-12 sm:py-4 text-lg sm:text-xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs sm:text-sm font-black uppercase">Total</div>
            <div className="text-3xl sm:text-4xl font-black">{todos.length}</div>
          </div>
          <div className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs sm:text-sm font-black uppercase">Active</div>
            <div className="text-3xl sm:text-4xl font-black">{activeTodos}</div>
          </div>
          <div className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs sm:text-sm font-black uppercase">Done</div>
            <div className="text-3xl sm:text-4xl font-black">{completedTodos}</div>
          </div>
        </div>

        {todos.length > 0 && (
          <>
            <div className="border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`border-b-2 sm:border-b-4 border-black last:border-b-0 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 ${
                    todo.completed ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 border-2 sm:border-4 border-black flex items-center justify-center font-black text-lg sm:text-xl cursor-pointer hover:bg-gray-100 flex-shrink-0 ${
                      todo.completed ? "bg-green-400" : "bg-white"
                    }`}
                  >
                    {todo.completed && "✓"}
                  </button>
                  <span
                    className={`flex-1 text-base sm:text-lg font-bold break-words ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {completedTodos > 0 && (
              <button
                onClick={clearCompleted}
                className="w-full border-4 sm:border-8 border-black bg-red-500 text-white px-6 py-3 sm:px-8 sm:py-4 font-black uppercase text-lg sm:text-xl hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
              >
                Clear Completed ({completedTodos})
              </button>
            )}
          </>
        )}

        {todos.length === 0 && (
          <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-5xl sm:text-6xl mb-4">📝</div>
            <div className="text-xl sm:text-2xl font-black uppercase text-gray-400">
              No tasks yet. Add one above!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
