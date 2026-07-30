export default function formatDate(date) {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );
}