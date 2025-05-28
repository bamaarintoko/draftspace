'use client'
import ArticleFilter from "@/components/ArticleFilter";
import TopNavbar from "@/components/TopNavbar";
import { useRequestWithQuery } from "@/lib/request/useRequestWithQuery";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import moment from "moment";
import "moment/locale/id";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import ArticleList from "@/components/ArticleList";
import ArticleSkeletons from "@/components/ArticleSkeletons";
import { useRouter } from "next/navigation";
moment.locale("id");

export default function PageUser() {
    const [title, setTitle] = useState("");
    const [debouncedTitle] = useDebounce(title, 400); // debounce 400ms
    const [category, setCategory] = useState("");
    const [page, setPage] = useState("1");

    const router = useRouter()

    const limit = '9';
    const { data, isLoading } = useRequestWithQuery("/articles", {
        title: debouncedTitle,
        category,
        limit: limit,
        page: page
    });
    const articles = data?.data ?? []; // fallback [] kalau belum ada
    useEffect(() => {
        console.log("data : ", data)
    }, [data])

    return (
        <div>
            <TopNavbar />

            <div
                className="w-full h-[500px] bg-center bg-cover relative"
                style={{ backgroundImage: "url('/images/header.jpg')" }}
            >
                <div className="absolute inset-0 bg-[#2563EBDB]/86" />
                {/* Konten tengah */}
                <div className="absolute inset-0 flex items-center justify-center z-10 flex-col text-center gap-3">
                    <p className="text-white xl:text-[16px] text-[14px] font-bold">Blog genzet</p>
                    <p className="text-white xl:text-5xl text-4xl font-medium xl:max-w-[730px] max-w-[337px]">The Journal : Design Resources,
                        Interviews, and Industry News</p>
                    <p className="text-white xl:text-2xl text-xl">Your daily dose of design insights!</p>
                    <ArticleFilter onFilterChange={({ category, keyword }) => {
                        setTitle(keyword)
                        setCategory(category)
                        console.log("filter updated:", category, keyword);
                        // kamu bisa trigger fetch di sini, atau simpan ke state
                    }} />
                </div>
                {/* Konten banner di sini (opsional) */}
            </div>
            <main>
                {isLoading && <ArticleSkeletons />}

                {!isLoading && articles.length > 0 && (
                    <ArticleList
                        onClickArticle={(article) => {
                            router.push(`user/article/${article.id}`);
                        }}
                        articles={articles}
                    />
                )}

                {!isLoading && articles.length === 0 && (
                    <div className="text-center text-slate-500 py-10">
                        <p className="text-lg font-medium">Artikel tidak ditemukan.</p>
                        <p className="text-sm text-slate-400 mt-1">Coba gunakan kata kunci lain atau filter yang berbeda.</p>
                    </div>
                )}

            </main>
            <div className="w-full  flex items-center justify-center py-4">
                <Pagination
                    page={page}
                    total={data?.total || 0}
                    limit={limit}
                    onPageChange={(newPage) => setPage(newPage.toString())}
                />

                {/* <Pagination /> */}
            </div>
            <Footer />
            {/* ini halaman user */}
        </div>
    )
}