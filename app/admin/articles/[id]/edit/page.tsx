'use client'
import { useRequest } from "@/lib/request/useRequest";
import { useParams, useRouter } from "next/navigation"
import ArticleForm from "../../component_/forms/ArticleForm";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Alert from "@/components/Alert";
import LoadingModal from "@/components/LoadingModal";

export default function PageEditArticle() {
    const params = useParams()
    const articleId = params?.id as string
    const router = useRouter()
    // ----
    const { data } = useRequest("/categories");
    const { data: articleData } = useRequest(`/articles/${articleId}`);


    const { send, isLoading: articleLoading, data: articleDataPut,isSuccess } = useRequest(`/articles/${articleId}`, {
        method: "put",
        autoFetch: false,
    });
    // ----
    const article = articleData ?? {}
    const options = data?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
    })) || [];

    useEffect(() => {
        if(isSuccess){
            router.back()
        }
        console.log("articleDataPut : ", articleDataPut)
    }, [articleDataPut])

    useEffect(() => {
        console.log("articleData : ", articleData)
    }, [articleData])
    return (
        <div className="bg-gray-50 rounded-xl border border-slate-200 p-5">
            <div className="inline-flex gap-2  items-center pb-5">
                <button className="cursor-pointer" onClick={() => router.back()}>

                    <ArrowLeft size={20} />
                </button>
                <p className="font-medium text-slate-900">Edit Articles</p>
            </div>
            {
                articleDataPut
                &&
                <Alert type="success" title="Info : " message={"Edit article berhasil"} />
            }
            <ArticleForm
                title="Edit"
                defaultValues={
                    {
                        "title": article.title,
                        "content": article.content,
                        "category": article.categoryId,
                        thumbnail: article.imageUrl
                    }
                }
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
            <LoadingModal isOpen={articleLoading} text="Sedang memproses data..." />
        </div>
    )
}