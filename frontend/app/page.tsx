"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CreateNoteModal,
  EditNoteModal,
  DeleteConfirmationModal,
} from "@/components/Modals";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NotePayload = {
  title: string;
  content: string;
};

const emptyForm: NotePayload = {
  title: "",
  content: "",
};

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState<NotePayload>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const noteCount = useMemo(() => notes.length, [notes]);

  const fetchNotes = async () => {
    const response = await fetch("/api/notes", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load notes");
    }

    return (await response.json()) as Note[];
  };

  const loadNotes = async () => {
    try {
      setError(null);
      setNotes(await fetchNotes());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Something went wrong");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        setError(null);
        setLoading(true);
        setNotes(await fetchNotes());
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void initialize();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsCreateOpen(false);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
    };

    if (!payload.title || !payload.content) {
      setError("Both title and content are required.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(
        editingId ? `/api/notes/${editingId}` : "/api/notes",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const message = await response.json().catch(() => null);
        throw new Error(message?.error ?? "Unable to save note");
      }

      resetForm();
      await loadNotes();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save note");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note._id);
    setForm({ title: note.title, content: note.content });
    setError(null);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(`/api/notes/${noteToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete note");
      }

      if (editingId === noteToDelete._id) {
        resetForm();
      }

      await loadNotes();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete note");
    } finally {
      setSaving(false);
      setNoteToDelete(null);
    }
  };

  return (
    <main className="min-h-screen bg-white text-neutral-800 flex flex-col font-sans">
      {/* Header Banner */}
      <header className="bg-[#E6E6E6] py-5 px-8 w-full border-b border-neutral-300">
        <div className="max-w-6xl mx-auto flex items-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Notes.</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto w-full px-8 py-8 flex flex-col gap-6 flex-grow">
        {/* Add Note Button Row */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              resetForm();
              setIsCreateOpen(true);
            }}
            className="bg-[#00A86B] hover:bg-[#00965E] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm text-sm"
          >
            <span className="text-base font-bold">+</span> Add Note
          </button>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-neutral-500 font-medium">
            Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-300 text-center">
            <p className="text-neutral-500 font-medium">No notes available.</p>
            <p className="text-xs text-neutral-400 mt-1">Create a note using the "+ Add Note" button.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <article
                key={note._id}
                className="bg-[#E6E6E6] p-6 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-neutral-900 break-words leading-tight">
                    {note.title}
                  </h3>
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap break-words leading-relaxed line-clamp-6">
                    {note.content}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-2">
                  {/* Delete Icon Button */}
                  <button
                    onClick={() => setNoteToDelete(note)}
                    className="text-[#D9383A] hover:text-red-700 transition-colors p-1"
                    title="Delete Note"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 3H15M3 6H21M5 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6ZM9 9V17H11V9H9ZM13 9V17H15V9H13Z" />
                    </svg>
                  </button>

                  {/* Edit Icon Button */}
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-[#00A86B] hover:text-[#00965E] transition-colors p-1"
                    title="Edit Note"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Modals */}
      <CreateNoteModal
        isOpen={isCreateOpen}
        form={form}
        error={error}
        saving={saving}
        onClose={resetForm}
        onChange={setForm}
        onSubmit={handleSubmit}
      />

      <EditNoteModal
        isOpen={!!editingId}
        form={form}
        error={error}
        saving={saving}
        onClose={resetForm}
        onChange={setForm}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmationModal
        isOpen={!!noteToDelete}
        saving={saving}
        onClose={() => setNoteToDelete(null)}
        onConfirm={confirmDelete}
      />
    </main>
  );
}