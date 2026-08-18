export const StatusBadge = ({ status }) => {
    const map = {
        "Delivered": "bg-green-100 text-green-700",
        "Out for Delivery": "bg-blue-100 text-blue-700",
        "Processing": "bg-amber-100 text-amber-700",
        "Cancelled": "bg-red-100 text-red-700",
    };
    return (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-700"}`}>
        {status}
        </span>
    );
};
