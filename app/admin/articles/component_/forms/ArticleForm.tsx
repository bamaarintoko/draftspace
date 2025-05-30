'use client'

import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import QuillEditor from '@/components/QuillEditor'
import Label from '../../create/component__/Label'
import ThumbnailUpload from '../../create/component__/ThumbnailUpload'
// import ThumbnailUpload from '@/components/ThumbnailUpload'
// import Label from '@/components/Label'

const schema = z.object({
    title: z.string().min(1, 'Judul wajib diisi'),
    category: z.string().min(1, 'Kategori wajib dipilih'),
    content: z.string().min(10, 'Konten minimal 10 karakter'),
    thumbnail: z.string().url().min(1, 'Thumbnail wajib diunggah'),
})

export type FormData = z.infer<typeof schema>

interface ArticleFormProps {
    title?:string
    defaultValues?: Partial<FormData>
    categories: { label: string; value: string }[]
    onSubmit: (data: FormData) => void
    onCancel?: () => void
    onPreview?: (data: FormData) => void
}

export default function ArticleForm({
    defaultValues,
    categories,
    onSubmit,
    onCancel,
    onPreview,
    title="Create"
}: ArticleFormProps) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            category: '',
            content: '',
            thumbnail: '',
            ...defaultValues,
        },
    })

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (!isFirstRender.current && defaultValues) {
            reset({ ...defaultValues })
        }
        isFirstRender.current = false
    }, [defaultValues, reset])

    const handleReset = () => {
        reset()
        setValue('content', '')
        setValue('thumbnail', '')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label label="Thumbnails" />
                <Controller
                    name="thumbnail"
                    control={control}
                    render={({ field }) => (
                        <>
                            <ThumbnailUpload value={field.value} onUploaded={field.onChange} />
                            {errors.thumbnail && (
                                <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <div>
                <Label label="Title" />
                <InputField
                    name="title"
                    placeholder="Masukkan judul"
                    register={register}
                    error={errors.title}
                />
            </div>

            <div>
                <Label label="Category" />
                <SelectField
                    name="category"
                    register={register}
                    error={errors.category}
                    options={categories}
                    placeholder="Pilih kategori"
                />
            </div>

            <Controller
                name="content"
                control={control}
                render={({ field }) => (
                    <>
                        <QuillEditor value={field.value} onChange={field.onChange} />
                        {errors.content && (
                            <p className="text-sm text-red-500 mt-2">{errors.content.message}</p>
                        )}
                    </>
                )}
            />

            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onCancel || handleReset}
                    className="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    disabled={!isValid}
                    onClick={handleSubmit(onPreview || (() => { }))}
                    className={`px-4 py-2 border rounded ${isValid
                        ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Preview
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {title}
                </button>
            </div>
        </form>
    )
}
