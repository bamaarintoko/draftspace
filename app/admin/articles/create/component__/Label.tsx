export default function Label({ label = "" }: { label: string }) {
    return (
        <p className="text-sm text-gray-900 font-medium">{label}</p>
    )
}