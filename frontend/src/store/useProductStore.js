import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://pern-project.vercel.app";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    formData: {
        name: "",
        image: "",
        price: ""
    },

    setFormData: (formData) => set({ formData }),

    resetForm: () =>
        set({
            formData: {
                name: "",
                image: "",
                price: ""
            }
        }),

    // =========================
    // ADD PRODUCT
    // =========================
    addProduct: async (e) => {
        e.preventDefault();

        set({ loading: true });

        try {
            const { formData } = get();

            await axios.post(
                `${BASE_URL}/api/products`,
                formData,
                getAuthConfig()
            );

            await get().fetchProducts();

            get().resetForm();

            toast.success("Product added successfully");

            document
                .getElementById("add_product_modal")
                .close();

        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                toast.error("Please login again");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            toast.error(
                err.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            set({ loading: false });
        }
    },

    // =========================
    // GET PRODUCTS
    // =========================
    fetchProducts: async () => {
        set({ loading: true });

        try {
            const response = await axios.get(
                `${BASE_URL}/api/products`
            );

            set({
                products: response.data.data,
                error: null
            });

        } catch (err) {
            console.log(err);

            if (err.response?.status === 429) {
                set({
                    error: "Rate Limit exceeded",
                    products: []
                });
            } else {
                set({
                    error: "Something Went Wrong",
                    products: []
                });
            }

        } finally {
            set({ loading: false });
        }
    },

    // =========================
    // DELETE PRODUCT
    // =========================
    deleteProduct: async (id) => {
        set({ loading: true });

        try {
            await axios.delete(
                `${BASE_URL}/api/products/${id}`,
                getAuthConfig()
            );

            set((state) => ({
                products: state.products.filter(
                    (product) => product.id !== id
                )
            }));

            toast.success(
                "Product deleted successfully"
            );

        } catch (err) {
            console.log(err);

            if (err.response?.status === 401) {
                toast.error("Please login again");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            toast.error(
                err.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            set({ loading: false });
        }
    },

    // =========================
    // GET SINGLE PRODUCT
    // =========================
    fetchProduct: async (id) => {
        set({ loading: true });

        try {
            const response = await axios.get(
                `${BASE_URL}/api/products/${id}`
            );

            const product = response.data.data[0];

            set({
                currentProduct: product,

                formData: {
                    name: product.name || "",
                    image: product.image || "",
                    price: product.price || ""
                },

                error: null
            });

        } catch (err) {
            console.log(
                "Error fetching product",
                err
            );

            set({
                error: "Something Went Wrong",
                currentProduct: null
            });

        } finally {
            set({ loading: false });
        }
    },

    // =========================
    // UPDATE PRODUCT
    // =========================
    updateProduct: async (id) => {
        set({ loading: true });

        try {
            const { formData } = get();

            const response = await axios.put(
                `${BASE_URL}/api/products/${id}`,
                formData,
                getAuthConfig()
            );

            set({
                currentProduct: response.data.data
            });

            toast.success(
                "Product updated successfully"
            );

        } catch (err) {
            console.log(
                "Error updating product",
                err
            );

            if (err.response?.status === 401) {
                toast.error("Please login again");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            toast.error(
                err.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            set({ loading: false });
        }
    }
}));
