'use client'

import { Loader2 } from 'lucide-react'

interface LoadingModalProps {
    isOpen: boolean
    text?: string
}

export default function LoadingModal({ isOpen, text }: LoadingModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-blue-500/80 flex items-center justify-center">
            <div className="bg-white rounded-lg px-6 py-4 flex flex-col items-center gap-3 shadow-lg min-w-[240px]">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <p className="text-sm text-gray-700">{text || 'Loading...'}</p>
            </div>
        </div>
    )
}
