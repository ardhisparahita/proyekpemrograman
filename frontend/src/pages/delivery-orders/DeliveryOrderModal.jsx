import Modal from "../../components/common/Modal";
import DeliveryOrderForm from "./DeliveryOrderForm";

export default function DeliveryOrderModal({
    open,
    onClose,
    onSubmit,
    loading,
    initialData = null,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                initialData
                    ? "Edit Delivery Order"
                    : "Tambah Delivery Order"
            }
        >
            <DeliveryOrderForm
                initialData={initialData}
                onSubmit={onSubmit}
                loading={loading}
            />
        </Modal>
    );
}