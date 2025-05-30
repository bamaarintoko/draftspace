'use client'
import { useEffect, useMemo, useState } from "react";
import AdminArticleFilter from "../articles/component_/AdminArticleFilter"
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosQuery from "@/lib/request/useAxiosQuery";
import Pagination from "@/components/Pagination";

export default function PageTest() {
    const router = useRouter()
    const searchParams = useSearchParams();

    const [title, setTitle] = useState(searchParams.get('title') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [page, setPage] = useState("1");

    const [debouncedTitle] = useDebounce(title, 300);
    const limit = '2'
    const params = useMemo(() => ({
        title: debouncedTitle,
        category: category,
        page: page,
        limit: limit
    }), [debouncedTitle, category, page]);
    const { data } = useAxiosQuery('articles', params);

    useEffect(() => {
        console.log("data : ", data)
    }, [data])
    useEffect(() => {
        const query = new URLSearchParams();
        if (debouncedTitle) query.set('title', debouncedTitle);
        if (category) query.set('category', category);
        if (page) query.set('page', page);
        router.push(`?${query.toString()}`);
    }, [debouncedTitle, category, page]);


    return (
        <div>
            <AdminArticleFilter onFilterChange={({ category, keyword }) => {
                console.log("asdad")
                setTitle(keyword)
                setCategory(category)
                // kamu bisa trigger fetch di sini, atau simpan ke state
            }} />
            <Pagination
                page={page}
                total={data?.total || 0}
                limit={limit}
                onPageChange={(newPage) => setPage(newPage.toString())}
            />
        </div>
    )
}