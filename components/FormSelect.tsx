// components/FormSelect.tsx
import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    registration: UseFormRegisterReturn;
    error?: string;
}

export default function FormSelect({ label, options, registration, error, ...props }: FormSelectProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            <select
                {...registration}
                {...props}
                className=" border-[#E2E8F0] w-full h-10 border rounded-md px-3 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="">Select Role</option>
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
