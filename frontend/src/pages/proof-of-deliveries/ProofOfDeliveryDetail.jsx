import Modal from "../../components/common/Modal";
import formatDate from "../../utils/formatDate";

export default function ProofOfDeliveryDetail({
    open,
    onClose,
    proof,
}) {
    if (!proof) {
        return null;
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Detail Proof of Delivery"
        >
            <div className="space-y-5">

                <div>
                    <p className="text-sm text-gray-500">
                        Delivery Order
                    </p>

                    <p className="font-semibold">
                        {proof.deliveryOrder?.do_number}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Received By
                    </p>

                    <p className="font-semibold">
                        {proof.received_by}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Uploaded At
                    </p>

                    <p className="font-semibold">
                        {formatDate(proof.uploaded_at)}
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-sm text-gray-500">
                        Photo
                    </p>

                    <img
                        src={proof.photo_url}
                        alt="Proof"
                        className="max-h-64 w-full rounded-lg border object-cover"
                    />

                    <a
                        href={proof.photo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                    >
                        Buka Foto
                    </a>
                </div>

                <div>
                    <p className="mb-2 text-sm text-gray-500">
                        Signature
                    </p>

                    <img
                        src={proof.signature_url}
                        alt="Signature"
                        className="max-h-64 w-full rounded-lg border object-contain"
                    />

                    <a
                        href={proof.signature_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                    >
                        Buka Signature
                    </a>
                </div>

            </div>
        </Modal>
    );
}