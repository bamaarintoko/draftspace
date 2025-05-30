'use client'
import { Plus } from "lucide-react";
import AdminArticleFilter from "./component_/AdminArticleFilter";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import moment from "moment";
import "moment/locale/id";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useDeleteRequest } from "@/lib/request/useDeleteRequest";
import LoadingModal from "@/components/LoadingModal";
import useAxiosQuery from "@/lib/request/useAxiosQuery";
import ArticleTable from "./component_/ArticleTable";
import ArticleTableSkeleton from "./component_/ArticleTableSkeleton";
moment.locale("id");

export default function PageArticles() {
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(searchParams.get('title') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [page, setPage] = useState("1");
    const [showModal, setShowModal] = useState(false)
    const [articleId, setArticleId] = useState("")
    const limit = '9';
    const [debouncedTitle] = useDebounce(title, 400); // debounce 400ms
    // const [modalDeleteLoading, setModalDeleteLoading] = useState(false)
    const {
        deleteRequest,
        isLoading: deleteLoading,
    } = useDeleteRequest();



    const router = useRouter()

    const params = useMemo(() => ({
        title: debouncedTitle,
        category: category,
        page: page,
        limit: limit
    }), [debouncedTitle, category, page]);

    const { data, isLoading, refetch } = useAxiosQuery('articles', params);

    const articles = data?.data ?? []; // fallback [] kalau belum ada
    const totalArticle = data?.total || 0

    useEffect(() => {
        const query = new URLSearchParams();
        if (debouncedTitle) query.set('title', debouncedTitle);
        if (category) query.set('category', category);
        if (page) query.set('page', page);
        router.push(`?${query.toString()}`);
    }, [debouncedTitle, category, page]);

    useEffect(() => {
        console.log("data : ", data)
    }, [data])

    const handlePreview = (x: any) => {
        console.log("x : ", x)
        const prev = {
            "title": x.title,
            "content": x.content,
            "category": x.category,
            thumbnail: x.imageUrl
        }
        sessionStorage.setItem('article-preview', JSON.stringify(prev))
        window.open('/preview', '_blank') // buka tab baru
    }

    const handleDelete = async () => {
        setShowModal(false)
        deleteRequest(`https://test-fe.mysellerpintar.com/api/articles/${articleId}`)
            .then((res) => {
                if (res) {
                    console.log("Deleted:", res);
                    refetch()
                }
            })
            .catch((err) => {

                console.error("Error:", err);
            });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 flex flex-1 flex-col">
            <div className="p-6">
                <p className="font-medium text-slate-800">Total Articles : {totalArticle}</p>
            </div>
            <div className="p-6 border-y border-y-slate-200 flex">
                <div className="flex-1">

                    <AdminArticleFilter onFilterChange={({ category, keyword }) => {
                        console.log("asdad")
                        setTitle(keyword)
                        setCategory(category)
                        // kamu bisa trigger fetch di sini, atau simpan ke state
                    }} />
                </div>
                <div>
                    <button onClick={() => router.push('articles/create')} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm gap-1.5 px-4 py-2 text-center inline-flex items-center ">
                        <Plus size={20} />
                        Add Articles
                    </button>
                </div>
            </div>
            {
                isLoading ? <ArticleTableSkeleton /> : <ArticleTable
                    articles={articles}
                    onPreview={(article) => handlePreview(article)}
                    onDelete={(id) => {
                        setArticleId(id);
                        setShowModal(true);
                    }}
                />
            }

            <LoadingModal isOpen={deleteLoading} />
            <ConfirmDeleteModal
                isOpen={showModal}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
            <div className="w-full  flex items-center justify-center py-4">
                <Pagination
                    page={page}
                    total={data?.total || 0}
                    limit={limit}
                    onPageChange={(newPage) => setPage(newPage.toString())}
                />

                {/* <Pagination /> */}
            </div>
        </div>
    )
}