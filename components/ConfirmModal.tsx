'use client';

import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title = "Confirm",
    description = "Are you sure?",
    onConfirm,
    onCancel,
    confirmText = "Yes",
    cancelText = "Cancel",
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-[#0A0B0E66] bg-opacity-40 z-40" />

            {/* Modal */}
            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="xl:w-[400px] xl:h-[160px] w-80 bg-white border-slate-200 rounded-lg p-6 shadow-lg flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                        <p className="text-slate-900 text-[18px] font-semibold">{title}</p>
                        <p className="text-slate-500 text-sm">{description}</p>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-red-700"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;
