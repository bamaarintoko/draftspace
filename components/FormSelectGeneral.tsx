'use client'
import React from "react";

interface Option {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
    error?: string;
    placeholder?:string
}

export default function FormSelectGeneral({
    options,
    value,
    onChange,
    name,
    error,
    placeholder
}: FormSelectProps) {
    return (
        <div className="flex flex-col gap-1">
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`text-[14px] bg-white w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"
                    }`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
