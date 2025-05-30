'use client';

import React from "react";

export default function ArticleTableSkeleton() {
    const tableHeader = "text-sm px-6 py-4 font-medium text-slate-900 whitespace-nowrap "

    return (
        <div className="relative overflow-x-auto w-full animate-pulse">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className={tableHeader}>Thumbnails</th>
                        <th className={tableHeader}>Title</th>
                        <th className={tableHeader}>Category</th>
                        <th className={tableHeader}>Created At</th>
                        <th className={tableHeader}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="bg-white border-b border-gray-200">
                            <td className="px-6 py-4">
                                <div className="w-[60px] h-[60px] bg-slate-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-32 bg-slate-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-24 bg-slate-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-40 bg-slate-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <div className="h-4 w-12 bg-slate-200 rounded" />
                                    <div className="h-4 w-10 bg-slate-200 rounded" />
                                    <div className="h-4 w-14 bg-slate-200 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
