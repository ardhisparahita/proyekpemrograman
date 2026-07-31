import Modal from "../../components/common/Modal";

import formatDate from "../../utils/formatDate";

export default function DailyReportDetail({
    open,
    onClose,
    report,
}) {
    if (!report) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Daily Report"
        >
            <div className="space-y-5">

                <div>
                    <p className="text-sm text-gray-500">
                        Report Date
                    </p>

                    <p className="font-semibold">
                        {formatDate(report.report_date)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        User
                    </p>

                    <p className="font-semibold">
                        {report.user?.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Email
                    </p>

                    <p className="font-semibold">
                        {report.user?.email}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Role
                    </p>

                    <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {report.user?.role}
                    </span>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Description
                    </p>

                    <div className="mt-2 rounded-lg border bg-gray-50 p-4 whitespace-pre-wrap">
                        {report.description}
                    </div>
                </div>

            </div>
        </Modal>
    );
}