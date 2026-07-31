import Modal from "../../components/common/Modal";
import formatDate from "../../utils/formatDate";

export default function ValidationDetail({
    open,
    onClose,
    validation,
}) {
    if (!validation) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Validation"
        >
            <div className="space-y-4">

                <div>

                    <p className="text-sm text-gray-500">
                        Delivery Order
                    </p>

                    <p className="font-semibold">
                        {
                            validation
                                .deliveryOrder
                                ?.do_number
                        }
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Validator
                    </p>

                    <p className="font-semibold">
                        {
                            validation
                                .validator
                                ?.name
                        }
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    <p className="font-semibold">
                        {
                            validation.validation_status
                        }
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Validation Time
                    </p>

                    <p className="font-semibold">
                        {formatDate(
                            validation.validation_time
                        )}
                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">
                        Notes
                    </p>

                    <p className="rounded border bg-gray-50 p-3">
                        {validation.notes ||
                            "-"}
                    </p>

                </div>

            </div>
        </Modal>
    );
}