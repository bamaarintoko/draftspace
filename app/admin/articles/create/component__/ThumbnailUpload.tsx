'use client'

import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ImagePlus } from 'lucide-react'

interface ThumbnailUploadProps {
    value?: string
    onUploaded?: (url: string) => void
}

export default function ThumbnailUpload({ value, onUploaded }: ThumbnailUploadProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [loading, setLoading] = useState(false)

    // Set preview dari value awal
    useEffect(() => {
        if (value) {
            setPreviewUrl(value)
        }
    }, [value])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const localPreview = URL.createObjectURL(file)
        setPreviewUrl(localPreview)

        const formData = new FormData()
        formData.append('image', file)
        const token = Cookies.get("token")

        try {
            setLoading(true)
            setUploadProgress(0)

            const response = await axios.post(
                'https://test-fe.mysellerpintar.com/api/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
                        setUploadProgress(percent)
                    },
                }
            )

            const uploadedUrl = response?.data?.imageUrl
            if (uploadedUrl) {
                onUploaded?.(uploadedUrl)
            }
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="w-[223px] h-[163px] border-2 border-dashed border-gray-300 rounded cursor-pointer relative flex items-center justify-center overflow-hidden"
            onClick={() => !loading && inputRef.current?.click()}
        >
            {previewUrl ? (
                <img src={previewUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
            ) : (
                <div className='flex flex-col items-center'>
                    <ImagePlus size={20} color='#64748B' />
                    <span className="text-xs text-slate-500">Click to select files</span>
                    <span className="text-xs text-slate-500">Support File Type: jpg or png</span>
                </div>
            )}

            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center text-sm text-gray-600">
                    <div className="mb-1">Uploading... {uploadProgress}%</div>
                    <div className="w-24 h-1 bg-gray-300 rounded overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}
