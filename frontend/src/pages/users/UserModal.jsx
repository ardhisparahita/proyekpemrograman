import Modal from "../../components/common/Modal";
import UserForm from "./UserForm";

export default function UserModal({
    open,
    onClose,
    onSubmit,
    loading,
}) {
    return (
        <Modal
            open={open}
            title="Tambah User"
            onClose={onClose}
        >
            <UserForm
                loading={loading}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}