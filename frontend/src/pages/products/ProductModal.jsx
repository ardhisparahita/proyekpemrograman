import Modal from "../../components/common/Modal";

import ProductForm from "./ProductForm";

export default function ProductModal({
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
                    ? "Edit Product"
                    : "Tambah Product"
            }
        >
            <ProductForm
                initialData={initialData}
                onSubmit={onSubmit}
                loading={loading}
            />
        </Modal>
    );
}