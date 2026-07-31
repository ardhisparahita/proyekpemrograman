import Modal from "../../components/common/Modal";
import VehicleTrackingForm from "./VehicleTrackingForm";

export default function VehicleTrackingModal({
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
                    ? "Edit Vehicle Tracking"
                    : "Tambah Vehicle Tracking"
            }
        >
            <VehicleTrackingForm
                loading={loading}
                initialData={initialData}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}