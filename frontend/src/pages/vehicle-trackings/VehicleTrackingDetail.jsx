import Modal from "../../components/common/Modal";
import formatDate from "../../utils/formatDate";

export default function VehicleTrackingDetail({
    open,
    onClose,
    tracking,
}) {
    if (!tracking) {
        return null;
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "STARTED":
                return (
                    <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800">
                        STARTED
                    </span>
                );

            case "ON_DELIVERY":
                return (
                    <span className="rounded bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-800">
                        ON DELIVERY
                    </span>
                );

            case "ARRIVED":
                return (
                    <span className="rounded bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-800">
                        ARRIVED
                    </span>
                );

            case "FINISHED":
                return (
                    <span className="rounded bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                        FINISHED
                    </span>
                );

            default:
                return (
                    <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold">
                        {status}
                    </span>
                );
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Vehicle Tracking"
        >
            <div className="space-y-5">

                <div>
                    <p className="text-sm text-gray-500">
                        Delivery Order
                    </p>

                    <p className="font-semibold">
                        {tracking.deliveryOrder?.do_number}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Driver
                    </p>

                    <p className="font-semibold">
                        {tracking.driver?.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Latitude
                    </p>

                    <p className="font-semibold">
                        {tracking.latitude}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Longitude
                    </p>

                    <p className="font-semibold">
                        {tracking.longitude}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    {getStatusBadge(tracking.status)}
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Tracking Time
                    </p>

                    <p className="font-semibold">
                        {formatDate(
                            tracking.tracking_time
                        )}
                    </p>
                </div>

            </div>
        </Modal>
    );
}