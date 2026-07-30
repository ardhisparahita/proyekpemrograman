import Modal from "../../components/common/Modal";

import InventoryForm from "./InventoryForm";

export default function InventoryModal({
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
                    ? "Edit Inventory"
                    : "Tambah Inventory"
            }
        >
            <InventoryForm
                initialData={initialData}
                onSubmit={onSubmit}
                loading={loading}
            />
        </Modal>
    );
}