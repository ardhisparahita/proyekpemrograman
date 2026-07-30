import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import productService from "../../services/productService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import ProductModal from "./ProductModal";

export default function ProductPage() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await productService.getAll();

            setProducts(response.data ?? []);
        } catch (error) {
            console.error(error);

            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchProducts();
    }, [fetchProducts]);

    const handleSubmit = async (data) => {
        try {
            setSubmitLoading(true);

            if (selectedProduct) {

                await productService.update(
                    selectedProduct.id,
                    data
                );

            } else {

                await productService.create(data);

            }

            setOpenModal(false);

            setSelectedProduct(null);

            await fetchProducts();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus produk ini?"
        );

        if (!confirmed) return;

        try {
            await productService.delete(id);

            await fetchProducts();
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ??
                    "Gagal menghapus produk."
            );
        }
    };

    return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Product
                </h1>

                <Button
                    onClick={() => {
                        setSelectedProduct(null);
                        setOpenModal(true);
                    }}
                >
                    Tambah Product
                </Button>

            </div>

            {loading ? (
                <Loading />
            ) : products.length === 0 ? (
                <EmptyState
                    title="Belum ada produk"
                />
            ) : (
                <Table>

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-4 py-3">
                                ID
                            </th>

                            <th className="px-4 py-3">
                                Code
                            </th>

                            <th className="px-4 py-3">
                                Product
                            </th>

                            <th className="px-4 py-3">
                                Barcode
                            </th>

                            <th className="px-4 py-3">
                                Unit
                            </th>

                            <th className="px-4 py-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-b"
                            >

                                <td className="px-4 py-3">
                                    {product.id}
                                </td>

                                <td className="px-4 py-3">
                                    {product.product_code}
                                </td>

                                <td className="px-4 py-3">
                                    {product.product_name}
                                </td>

                                <td className="px-4 py-3">
                                    {product.barcode}
                                </td>

                                <td className="px-4 py-3">
                                    {product.unit}
                                </td>

                                <td className="space-x-2 px-4 py-3">

                                    <Button
                                        className="bg-yellow-500 hover:bg-yellow-600"
                                        onClick={() => {
                                            setSelectedProduct(product);

                                            setOpenModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() =>
                                            handleDelete(
                                                product.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>
            )}

            <ProductModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setSelectedProduct(null);
    }}
    loading={submitLoading}
    initialData={selectedProduct}
    onSubmit={handleSubmit}
/>

        </DashboardLayout>
    );
}