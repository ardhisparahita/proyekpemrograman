import Modal from "../../components/common/Modal";

import AuditLogForm from "./AuditLogForm";

export default function AuditLogModal({
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
                    ? "Edit Audit Log"
                    : "Tambah Audit Log"
            }
        >
            <AuditLogForm
                loading={loading}
                initialData={initialData}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}