export default function CategoryTableSkeleton() {
    const tableHeader = "text-sm px-6 py-4 font-medium text-slate-900 whitespace-nowrap "
    return (
        <div className="relative overflow-x-auto w-full animate-pulse">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className={tableHeader}>Category</th>
                        <th className={tableHeader}>Created At</th>
                        <th className={tableHeader}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, index) => (
                        <tr key={index} className="bg-white border-b border-gray-200">
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <div className="h-4 bg-gray-300 rounded w-10"></div>
                                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
