'use client';

import React from "react";
import moment from "moment";

interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export default function CategoryTable({
    categories,
    onEdit,
    onDelete,
}: CategoryTableProps) {
    const tableHeader = "text-sm px-6 py-4 font-medium text-slate-900 whitespace-nowrap "

    return (
        <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className={tableHeader}>Category</th>
                        <th className={tableHeader}>Created At</th>
                        <th className={tableHeader}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="bg-white border-b border-gray-200">
                            <td className="px-6 py-4">{category.name}</td>
                            <td className="px-6 py-4">
                                {moment(category.createdAt).format("MMMM DD, YYYY HH:mm:ss")}
                            </td>
                            <td className="px-6 py-4">
                                <div className="inline-flex gap-3">
                                    <button
                                        onClick={() => onEdit(category)}
                                        className="cursor-pointer text-sm text-blue-600 underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(category)}
                                        className="cursor-pointer text-sm text-red-500 underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
