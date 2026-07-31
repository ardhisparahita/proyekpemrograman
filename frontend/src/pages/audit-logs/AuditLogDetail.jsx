import Modal from "../../components/common/Modal";

import formatDate from "../../utils/formatDate";

export default function AuditLogDetail({
    open,
    onClose,
    auditLog,
}) {
    if (!auditLog) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Audit Log"
        >
            <div className="space-y-5">

                <div>
                    <p className="text-sm text-gray-500">
                        User
                    </p>

                    <p className="font-semibold">
                        {auditLog.user?.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Email
                    </p>

                    <p className="font-semibold">
                        {auditLog.user?.email}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Role
                    </p>

                    <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {auditLog.user?.role}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Activity
                    </p>

                    <p className="font-semibold">
                        {auditLog.activity}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Module
                    </p>

                    <p className="font-semibold">
                        {auditLog.module}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        IP Address
                    </p>

                    <p className="font-semibold">
                        {auditLog.ip_address}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Created At
                    </p>

                    <p className="font-semibold">
                        {formatDate(
                            auditLog.created_at
                        )}
                    </p>
                </div>

            </div>
        </Modal>
    );
}