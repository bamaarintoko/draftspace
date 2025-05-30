import { FieldError, UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
    name: string
    register: UseFormRegister<any>
    error?: FieldError
    type?: string
    placeholder?: string
}

export default function InputField({
    name,
    register,
    error,
    type = 'text',
    placeholder,
}: InputFieldProps) {
    return (
        <div className="space-y-1">
            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`w-full px-3 h-10 border rounded ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}
