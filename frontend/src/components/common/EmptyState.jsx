export default function EmptyState({
    title = "Data tidak ditemukan",
}) {
    return (
        <div className="py-20 text-center text-gray-500">
            {title}
        </div>
    );
}