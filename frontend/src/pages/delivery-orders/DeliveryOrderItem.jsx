import Button from "../../components/common/Button";

export default function DeliveryOrderItem({
    products,
    item,
    index,
    onChange,
    onRemove,
}) {
    return (
        <div className="mb-3 rounded-lg border p-4">

            <div className="grid grid-cols-12 gap-3">

                <div className="col-span-7">

                    <label className="mb-2 block font-medium">
                        Product
                    </label>

                    <select
                        value={item.product_id}
                        onChange={(e) =>
                            onChange(
                                index,
                                "product_id",
                                Number(e.target.value)
                            )
                        }
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="">
                            Pilih Product
                        </option>

                        {products.map((product) => (

                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.product_name}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-span-3">

                    <label className="mb-2 block font-medium">
                        Quantity
                    </label>

                    <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                            onChange(
                                index,
                                "quantity",
                                Number(e.target.value)
                            )
                        }
                        className="w-full rounded-lg border p-3"
                    />

                </div>

                <div className="col-span-2 flex items-end">

                    <Button
                        type="button"
                        className="w-full bg-red-500 hover:bg-red-600"
                        onClick={() => onRemove(index)}
                    >
                        Hapus
                    </Button>

                </div>

            </div>

        </div>
    );
}