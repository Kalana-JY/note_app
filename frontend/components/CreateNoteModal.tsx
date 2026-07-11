"use client";

import React from "react";

interface NotePayload {
  title: string;
  content: string;
}

interface CreateNoteModalProps {
  isOpen: boolean;
  form: NotePayload;
  error: string | null;
  saving: boolean;
  onClose: () => void;
  onChange: (updater: (prev: NotePayload) => NotePayload) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function CreateNoteModal({
  isOpen,
  form,
  error,
  saving,
  onClose,
  onChange,
  onSubmit,
}: CreateNoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 p-1 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Title</label>
            <input
              value={form.title}
              onChange={(e) => onChange((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full bg-[#E6E6E6] rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/40 text-sm font-medium"
              maxLength={80}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-1.5">Description</label>
            <textarea
              value={form.content}
              onChange={(e) => onChange((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full bg-[#E6E6E6] rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/40 text-sm font-medium min-h-[160px] resize-none"
              maxLength={1000}
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#00A86B] hover:bg-[#00965E] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {saving ? "Creating..." : "+ Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
