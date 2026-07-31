import Modal from "../../components/common/Modal";
import DailyReportForm from "./DailyReportForm";

export default function DailyReportModal({
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
                    ? "Edit Daily Report"
                    : "Tambah Daily Report"
            }
        >
            <DailyReportForm
                loading={loading}
                initialData={initialData}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}