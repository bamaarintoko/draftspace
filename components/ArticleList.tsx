import Image from "next/image";
import moment from "moment";

interface Article {
    id: string;
    imageUrl: string | null;
    title: string;
    content: string;
    createdAt: string;
    category: {
        name: string;
    };
}

interface ArticleListProps {
    articles: Article[];
    onClickArticle?: (article: Article) => void;
}

export default function ArticleList({ articles, onClickArticle }: ArticleListProps) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 xl:space-x-10 xl:px-[100px] px-[20px] pt-10 xl:space-y-10 space-y-6">
            {articles.map((x, index) => (
                <div key={index} onClick={() => onClickArticle?.(x)} className="cursor-pointer">
                    <div className="w-full h-[240px] relative rounded-xl overflow-hidden">
                        {typeof x.imageUrl === "string" && x.imageUrl.trim() !== "" && (
                            <Image
                                sizes="(min-width: 1280px) 33vw, 100vw"

                                src={x.imageUrl}
                                alt={x.title}
                                fill // membuat gambar menutupi parent
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div className="space-y-2 mt-2">
                        <p className="text-sm text-slate-600">{moment(x.createdAt).format("MMMM DD, YYYY")}</p>
                        <p className="text-lg text-slate-900 font-semibold line-clamp-1">{x.title}</p>
                        <p className="text-slate-600 line-clamp-2 min-h-[3.2rem]">{x.content}</p>
                        <div className="bg-blue-200 w-fit rounded-[100px] px-3 py-1">
                            <p className="text-sm text-blue-900">{x.category.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
