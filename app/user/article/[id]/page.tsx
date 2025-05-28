'use client'
import OtherArticles from "@/components/OtherArticles";
import { useRequest } from "@/lib/request/useRequest";
import moment from "moment";
import "moment/locale/id";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ArticleContent from "./component_/ArticleContent";
import ArticleSkeleton from "./component_/ArticleSkeleton";
moment.locale("id");

export default function PageArticle() {
    const params = useParams();
    const id = params.id as string;
    const { data, isLoading } = useRequest(`/articles/${id}`);

    const article = data ?? {}

    useEffect(() => {
        console.log('data : ', article)
    }, [article])
    return (

        <div className="max-w-[1120px] mx-auto my-5 px-4 xl:px0">
            {isLoading ? <ArticleSkeleton /> : <ArticleContent article={article} />}


            <OtherArticles />
        </div>
    )
}