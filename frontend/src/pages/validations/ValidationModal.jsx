import Modal from "../../components/common/Modal";
import ValidationForm from "./ValidationForm";

export default function ValidationModal({
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
                    ? "Edit Validation"
                    : "Tambah Validation"
            }
        >
            <ValidationForm
                loading={loading}
                initialData={initialData}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}