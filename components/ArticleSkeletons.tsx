import ArticleSkeleton from "./ArticleSkeleton";

export default function ArticleSkeletons() {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 xl:space-x-10 xl:px-[100px] px-[20px] pt-10 xl:space-y-10 space-y-6">
        {Array.from({ length: 9 }).map((_, idx) => (
          <ArticleSkeleton key={idx} />
        ))}
      </div>
    );
  }