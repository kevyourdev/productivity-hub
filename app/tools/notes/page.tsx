"use client";

import { useState } from "react";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      createdAt: new Date(),
    };

    if (currentNote) {
      setNotes(notes.map((n) => (n.id === currentNote.id ? newNote : n)));
    } else {
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setCurrentNote(null);
  };

  const editNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setTitle("");
      setContent("");
    }
  };

  const cancelEdit = () => {
    setCurrentNote(null);
    setTitle("");
    setContent("");
  };

  const hasContent = title.trim() || content.trim();

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
        style={{ animation: 'slideInLeft 0.4s ease-out' }}
      >
        ← Back
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Quick Notes</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Capture your thoughts instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-black uppercase">
                {currentNote ? "Edit Note" : "New Note"}
              </h2>
              {currentNote && (
                <button
                  onClick={cancelEdit}
                  className="border-2 sm:border-4 border-black bg-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="NOTE TITLE..."
              className="w-full border-2 sm:border-4 border-black px-3 py-2 sm:px-4 sm:py-3 text-lg sm:text-xl font-bold uppercase mb-3 sm:mb-4 placeholder:text-gray-400 focus:outline-none focus:bg-yellow-100"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="START TYPING..."
              rows={12}
              className="w-full border-2 sm:border-4 border-black px-3 py-2 sm:px-4 sm:py-3 text-base sm:text-lg font-mono mb-3 sm:mb-4 placeholder:text-gray-400 focus:outline-none focus:bg-yellow-100 resize-none"
            />

            <button
              onClick={createNewNote}
              disabled={!hasContent}
              className="w-full bg-black text-white border-4 sm:border-8 border-black px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {currentNote ? "Update Note" : "Save Note"}
            </button>
          </div>

          <div>
            <div className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-4">
              <div className="text-white text-xl sm:text-2xl font-black uppercase">
                Total Notes: {notes.length}
              </div>
            </div>

            {notes.length === 0 ? (
              <div className="border-4 sm:border-8 border-black p-10 sm:p-12 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="text-5xl sm:text-6xl mb-4">📝</div>
                <div className="text-lg sm:text-xl font-black uppercase text-gray-400">
                  No notes yet. Create one!
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="border-4 sm:border-8 border-black p-3 sm:p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] transition-all"
                  >
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2 break-words">
                      {note.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono mb-3 sm:mb-4 break-words whitespace-pre-wrap line-clamp-3">
                      {note.content}
                    </p>
                    <div className="text-xs font-bold text-gray-500 mb-2 sm:mb-3">
                      {new Date(note.createdAt).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editNote(note)}
                        className="flex-1 border-2 sm:border-4 border-black bg-blue-400 text-black px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="flex-1 border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
