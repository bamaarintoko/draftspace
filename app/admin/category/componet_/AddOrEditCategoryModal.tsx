import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddOrEditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    initialValue?: string;
    title?: string;
    submitText?: string;
}

const schema = z.object({
    category: z.string().min(1, "Category is required"),
});

type FormData = z.infer<typeof schema>;

export default function AddOrEditCategoryModal({
    isOpen,
    onClose,
    onSubmit,
    initialValue = "",
    title = "Add Category",
    submitText = "Add",
}: AddOrEditCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { category: initialValue },
    });

    // Reset form saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            reset({ category: initialValue });
        }
    }, [isOpen, initialValue, reset]);

    const handleFormSubmit = (data: FormData) => {
        onSubmit(data.category);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-40" />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="w-[400px] h-[240px] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col h-full justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <input
                                type="text"
                                {...register("category")}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errors.category
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-slate-300 focus:ring-blue-500"
                                    }`}
                                placeholder="Enter category name"
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    reset();
                                }}
                                className="px-4 py-2 text-sm text-slate-700 border border-slate-300 rounded hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                {submitText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
