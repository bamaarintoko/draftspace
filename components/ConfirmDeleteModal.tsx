'use client';

import React from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean; // opsional, jika confirm button ingin warna merah
}

export default function ConfirmModal({
    isOpen,
    onCancel,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
                <p className="text-sm text-slate-600 mb-6">{description}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={"px-4 py-2 rounded text-white  bg-red-600 hover:bg-red-700"}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
