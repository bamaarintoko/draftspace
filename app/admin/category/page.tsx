export default function PageCategory() {
    return (
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Category</h1>
            {/* Simulasi konten panjang */}
            <div className="space-y-4">
                {Array.from({ length: 50 }).map((_, i) => (
                    <p key={i}>Content line {i + 1}</p>
                ))}
            </div>
        </main>
    )
}