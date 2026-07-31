import Modal from "../../components/common/Modal";
import ProofOfDeliveryForm from "./ProofOfDeliveryForm";

export default function ProofOfDeliveryModal({
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
                    ? "Edit Proof of Delivery"
                    : "Tambah Proof of Delivery"
            }
        >
            <ProofOfDeliveryForm
                loading={loading}
                initialData={initialData}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}