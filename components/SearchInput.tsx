import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    name,
}: SearchInputProps) {
    return (
        <div className="relative w-full">
            {/* Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
            </div>

            {/* Input */}
            <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className=" bg-white w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
}
