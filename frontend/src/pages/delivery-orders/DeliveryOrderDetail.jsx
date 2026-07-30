import Modal from "../../components/common/Modal";

export default function DeliveryOrderDetail({
    open,
    onClose,
    deliveryOrder,
}) {
    if (!deliveryOrder) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Delivery Order"
        >
            <div className="space-y-3">

                <div>

                    <p className="text-sm text-gray-500">
                        DO Number
                    </p>

                    <p className="font-semibold">
                        {deliveryOrder.do_number}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Driver
                    </p>

                    <p className="font-semibold">
                        {deliveryOrder.driver?.name}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Destination
                    </p>

                    <p className="font-semibold">
                        {deliveryOrder.destination}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Delivery Date
                    </p>

                    <p className="font-semibold">
                        {deliveryOrder.delivery_date}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    <p className="font-semibold">
                        {deliveryOrder.status}
                    </p>

                </div>

                <hr />

                <h3 className="text-lg font-semibold">
                    Delivery Items
                </h3>

                {deliveryOrder.items?.map((item) => (

                    <div
                        key={item.id}
                        className="rounded border p-3"
                    >

                        <p className="font-semibold">
                            {item.product?.product_name}
                        </p>

                        <p className="text-sm text-gray-600">
                            Qty : {item.qty} {item.product?.unit}
                        </p>

                    </div>

                ))}

            </div>
        </Modal>
    );
}