type PaginationProps = {
    page: string;
    total: number;
    limit: string;
    onPageChange: (newPage: number) => void;
};

export default function Pagination({ page, total, limit, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(total / Number(limit));

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation example" className="mt-6">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => onPageChange(Number(page) - 1)}
                        disabled={Number(page) === 1}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Previous
                    </button>
                </li>

                {pages.map((p) => (
                    <li key={p}>
                        <button
                            onClick={() => onPageChange(p)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300
                ${p === Number(page)
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                                }`}
                        >
                            {p}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => onPageChange(Number(page) + 1)}
                        disabled={Number(page) === totalPages}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
