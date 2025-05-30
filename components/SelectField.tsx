import { FieldError, UseFormRegister } from 'react-hook-form'

interface Option {
    label: string
    value: string
}

interface SelectFieldProps {
    name: string
    register: UseFormRegister<any>
    error?: FieldError
    options: Option[]
    placeholder?: string
}

export default function SelectField({
    name,
    register,
    error,
    options,
    placeholder = 'Pilih opsi',
}: SelectFieldProps) {
    return (
        <div className="space-y-1">
            <select
                {...register(name)}
                className={`w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                defaultValue=""
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}
