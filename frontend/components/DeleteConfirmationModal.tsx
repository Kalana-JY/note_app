"use client";

import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  saving,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-base font-bold text-neutral-900 text-center mb-6 mt-4">
          Are you sure you want to delete this note?
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onConfirm}
            disabled={saving}
            className="bg-[#D9383A] hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? "Deleting..." : "Yes"}
          </button>
          <button
            onClick={onClose}
            className="bg-[#00A86B] hover:bg-[#00965E] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
