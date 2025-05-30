'use client'
import { ArrowLeft } from "lucide-react";
import { useRequest } from "@/lib/request/useRequest";
import { useEffect} from "react";
import ArticleForm from "../component_/forms/ArticleForm";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/LoadingModal";
import Alert from "@/components/Alert";


export default function PageCreateArticle() {
    const router = useRouter()
    const { data } = useRequest("/categories");

    const { send, isLoading, error, data: articleData } = useRequest("/articles", {
        method: "post",
        autoFetch: false,
    });

    const options = data?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    })) || [];

    useEffect(() => {
        console.log('errors : ', error)
    }, [error])

    useEffect(() => {
        console.log('articleData : ', articleData)
    }, [articleData])


    return (
        <div className="bg-gray-50 rounded-xl border border-slate-200 p-5 flex flex-1 flex-col">
            <div className="inline-flex gap-2  items-center pb-5">
                <button onClick={() => router.back()} className="cursor-pointer">

                    <ArrowLeft size={20} />
                </button>
                <p className="font-medium text-slate-900">Create Articles</p>
            </div>
            {
                articleData
                &&
                <Alert type="success" title="Info : " message={"Tambah article berhasil"} />
            }
            <ArticleForm
                title="Create"
                categories={options}
                onSubmit={(data) => {
                    send({
                        "title": data.title,
                        "content": data.content,
                        "categoryId": data.category,
                        imageUrl: data.thumbnail
                    })
                    // Simpan ke server
                    console.log('CREATE:', data)
                }}
                onPreview={(data) => {
                    sessionStorage.setItem('article-preview', JSON.stringify(data))
                    window.open('/preview', '_blank') // buka tab baru
                    // Tampilkan preview
                    console.log('PREVIEW:', data)
                }}
            />
            <LoadingModal isOpen={isLoading} text="Sedang memproses data..." />
        </div>
    )
}