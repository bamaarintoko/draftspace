// components/FormInput.tsx
"use client";

import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
}

export default function FormInput({
    label,
    error,
    registration,
    ...props
}: FormInputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            <input
                {...registration}
                {...props}
                className="border-[#E2E8F0] h-[40px] w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
