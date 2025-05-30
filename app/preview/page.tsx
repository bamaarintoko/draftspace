'use client'

import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'
import OtherArticles from '@/components/OtherArticles'

interface PreviewArticle {
    title: string
    content: string
    thumbnail: string
    category: string
}

export default function ArticlePreviewPage() {
    const [article, setArticle] = useState<PreviewArticle | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem('article-preview')
        if (stored) {
            setArticle(JSON.parse(stored))
        }
    }, [])

    if (!article) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading preview...
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <TopNavbar />
            <div className="max-w-4xl mx-auto px-4 xl:px-0 py-10">
                {/* Header */}
                <div className="flex justify-center flex-col items-center gap-4 text-center">
                    <p className="text-slate-600 text-sm font-medium">
                        {moment().format('MMMM DD, YYYY')} • Preview Mode
                    </p>
                    <p className="text-3xl text-slate-900 font-semibold max-w-[642px]">
                        {article.title}
                    </p>
                </div>

                {/* Image */}
                <div className="w-full xl:h-[480px] h-[240px] relative rounded-xl overflow-hidden mt-6">
                    {typeof article.thumbnail === 'string' && article.thumbnail.trim() !== '' && (
                        <Image
                            sizes="(min-width: 1280px) 33vw, 100vw"
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>

                {/* Content */}
                <div
                    className="my-10 prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <OtherArticles />
            </div>
            <Footer />
        </div>
    )
}
