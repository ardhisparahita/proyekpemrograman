export default function Input({
    label,
    ...props
}) {
    return (
        <div className="space-y-2">

            {label && (
                <label className="font-medium">
                    {label}
                </label>
            )}

            <input
                {...props}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
            />

        </div>
    );
}