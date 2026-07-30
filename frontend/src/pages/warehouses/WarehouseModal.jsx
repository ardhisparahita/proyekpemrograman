import Modal from "../../components/common/Modal";
import WarehouseForm from "./WarehouseForm";

export default function WarehouseModal({
    open,
    onClose,
    onSubmit,
    loading,
    initialData,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                initialData
                    ? "Edit Warehouse"
                    : "Tambah Warehouse"
            }
        >
            <WarehouseForm
                loading={loading}
                onSubmit={onSubmit}
                initialData={initialData}
            />
        </Modal>
    );
}