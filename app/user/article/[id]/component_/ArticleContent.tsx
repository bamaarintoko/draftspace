import Image from "next/image";
import moment from "moment";

interface ArticleContentProps {
	article: {
		title: string;
		createdAt: string;
		content: string;
		imageUrl?: string;
		user?: {
			username?: string;
		};
	};
}

export default function ArticleContent({ article }: ArticleContentProps) {
	if (!article.title && !article.content) {
		return (
			<div className="text-center text-slate-500 py-20">
				<p className="text-lg">Artikel tidak ditemukan.</p>
			</div>
		);
	}
	return (
		<>
			{/* Header */}
			<div className="flex justify-center flex-col items-center gap-4 text-center">
				<p className="text-slate-600 text-sm font-medium">
					{moment(article.createdAt).format("MMMM DD, YYYY")} • Created by{" "}
					{article?.user?.username ?? ""}
				</p>
				<p className="text-3xl text-slate-900 font-semibold max-w-[642px]">
					{article.title}
				</p>
			</div>

			{/* Image */}
			<div className="w-full xl:h-[480px] h-[240px] relative rounded-xl overflow-hidden mt-6">
				{typeof article.imageUrl === "string" && article.imageUrl.trim() !== "" && (
					<Image
						sizes="(min-width: 1280px) 33vw, 100vw"
						src={article.imageUrl}
						alt={article.title}
						fill
						className="object-cover"
					/>
				)}
			</div>

			{/* Content */}
			<div
				className="my-10"
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>
		</>
	);
}
