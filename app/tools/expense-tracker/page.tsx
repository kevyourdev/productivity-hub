"use client";

import { useState } from "react";
import Link from "next/link";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const addExpense = () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = categories.map((cat) => ({
    category: cat,
    total: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  }));

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
        style={{ animation: 'slideInLeft 0.4s ease-out' }}
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Expense Tracker</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Track your spending and manage expenses
          </p>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <label className="block text-sm sm:text-base font-black uppercase mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you buy?"
                className="w-full border-4 border-black p-2 sm:p-3 text-base sm:text-lg font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-black uppercase mb-2">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full border-4 border-black p-2 sm:p-3 text-base sm:text-lg font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-black uppercase mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-4 border-black p-2 sm:p-3 text-base sm:text-lg font-bold uppercase bg-white focus:outline-none focus:ring-4 focus:ring-black"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm sm:text-base font-black uppercase mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-4 border-black p-2 sm:p-3 text-base sm:text-lg font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
              />
            </div>
          </div>
          <button
            onClick={addExpense}
            className="w-full bg-black text-white border-4 sm:border-8 border-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
          >
            Add Expense
          </button>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-gradient-to-br from-red-500 to-pink-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <div className="text-center text-white">
            <div className="text-sm sm:text-base font-bold uppercase mb-2">Total Expenses</div>
            <div className="text-5xl sm:text-7xl font-black">${total.toFixed(2)}</div>
          </div>
        </div>

        {categoryTotals.some((ct) => ct.total > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {categoryTotals
              .filter((ct) => ct.total > 0)
              .map((ct) => (
                <div
                  key={ct.category}
                  className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="text-xs sm:text-sm font-black uppercase">{ct.category}</div>
                  <div className="text-2xl sm:text-3xl font-black">${ct.total.toFixed(2)}</div>
                </div>
              ))}
          </div>
        )}

        {expenses.length > 0 ? (
          <div className="border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {expenses
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => (
                <div
                  key={expense.id}
                  className="border-b-2 sm:border-b-4 border-black last:border-b-0 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
                >
                  <div className="flex-1">
                    <div className="text-base sm:text-lg font-black uppercase mb-1">
                      {expense.description}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      <span className="font-bold uppercase bg-gray-200 px-2 py-1 border-2 border-black">
                        {expense.category}
                      </span>
                      <span className="font-bold text-gray-600">
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl font-black">${expense.amount.toFixed(2)}</div>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-5xl sm:text-6xl mb-4">💰</div>
            <div className="text-xl sm:text-2xl font-black uppercase text-gray-400">
              No expenses yet. Add one above!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

