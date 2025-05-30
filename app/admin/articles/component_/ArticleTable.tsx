'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

interface Article {
    id: string;
    title: string;
    imageUrl: string;
    createdAt: string;
    category: {
        name: string;
    };
}

interface ArticleTableProps {
    articles: Article[];
    onPreview: (article: Article) => void;
    onDelete: (id: string) => void;
}

export default function ArticleTable({
    articles,
    onPreview,
    onDelete,
}: ArticleTableProps) {
    const tableHeader = "text-sm px-6 py-4 font-medium text-slate-900 whitespace-nowrap "
    return (
        <div className="relative overflow-x-auto w-full">
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
                    {articles.map((x) => (
                        <tr key={x.id} className="bg-white border-b border-gray-200">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div style={{ width: 60, height: 60, position: "relative" }}>
                                    <Image
                                        src={x.imageUrl}
                                        alt="Thumbnail"
                                        fill
                                        style={{ objectFit: "cover", borderRadius: 8 }}
                                    />
                                </div>
                            </th>
                            <td className="px-6 py-4">{x.title}</td>
                            <td className="px-6 py-4">{x.category.name}</td>
                            <td className="px-6 py-4">
                                {moment(x.createdAt).format("MMMM DD, YYYY HH:mm:ss")}
                            </td>
                            <td className="px-6 py-4">
                                <div className="inline-flex gap-3">
                                    <button
                                        onClick={() => onPreview(x)}
                                        className="text-blue-600 underline cursor-pointer"
                                    >
                                        Preview
                                    </button>
                                    <Link
                                        href={`articles/${x.id}/edit`}
                                        className="text-blue-600 underline cursor-pointer"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => onDelete(x.id)}
                                        className="text-red-500 underline cursor-pointer"
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
