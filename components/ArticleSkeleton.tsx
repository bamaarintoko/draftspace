export default function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[240px] bg-slate-200 rounded-xl" />
      <div className="space-y-2 mt-2">
        <div className="w-1/3 h-4 bg-slate-200 rounded" />
        <div className="w-full h-5 bg-slate-300 rounded" />
        <div className="w-full h-4 bg-slate-200 rounded" />
        <div className="w-1/4 h-6 bg-blue-100 rounded-full" />
      </div>
    </div>
  );
}