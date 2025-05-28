export default function ArticleSkeleton() {
	return (
		<div className="animate-pulse">
			{/* Header */}
			<div className="flex justify-center flex-col items-center gap-4 text-center">
				<div className="h-4 w-60 bg-slate-300 rounded" />
				<div className="h-8 w-[642px] max-w-full bg-slate-400 rounded" />
			</div>

			{/* Image Placeholder */}
			<div className="w-full xl:h-[480px] h-[240px] bg-slate-300 rounded-xl mt-6" />

			{/* Content Placeholder */}
			<div className="my-10 space-y-4">
				<div className="h-4 w-full bg-slate-200 rounded" />
				<div className="h-4 w-[90%] bg-slate-200 rounded" />
				<div className="h-4 w-[95%] bg-slate-200 rounded" />
				<div className="h-4 w-[80%] bg-slate-200 rounded" />
				<div className="h-4 w-full bg-slate-200 rounded" />
				<div className="h-4 w-[70%] bg-slate-200 rounded" />
			</div>
		</div>
	);
}
