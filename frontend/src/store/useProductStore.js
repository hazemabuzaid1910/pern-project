import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"
const BASE_URL = "";
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
    resetForm: () => set({ formData: { name: "", image: "", price: "" } }),
    addProduct: async(e) => {
        e.preventDefault();
        set({ loading: true })
        try {
            const { formData } = get()
            await axios.post(`${BASE_URL}/api/products/`, formData)
            await get().fetchProducts()
            get().resetForm()
            toast.success("Product added successfully")
            document.getElementById("add_product_modal").close()
        } catch (err) {
            console.log(err)
            toast.error("Something Went Wrong")
        }

    },
    fetchProducts: async() => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/api/products`)
            set({ products: response.data.data, error: null })


        } catch (err) {
            if (err.response == 429) {
                set({ error: "Rate Limit exceeded", products: [] })
            } else {
                set({ error: "Something Went Wrong", products: [] })

            }

        } finally {
            set({ loading: false })
        }


    },
    deleteProduct: async(id) => {
        set({ loading: true })
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set((state) => ({
                products: state.products.filter(product => product.id !== id)
            }))
            toast.success("Product deleted successfuly")


        } catch (err) {
            console.log(err)
            toast.error("Something Went Wrong")

        } finally {
            set({ loading: false })
        }


    },
    fetchProduct: async(id) => {
        set({ loading: true })
        try {
            const response = await axios.get(`${BASE_URL}/api/products/${id}`)
            const product = response.data.data[0] // خذ العنصر الأول من المصفوفة
            set({
                currentProduct: product,
                formData: {
                    name: product.name || "",
                    image: product.image || "",
                    price: product.price || ""
                },
                error: null
            })
        } catch (err) {
            console.log("Error fetching product", err)
            set({ error: "Something Went Wrong ", currentProduct: null })
        } finally {
            set({ loading: false })
        }
    },
    updateProduct: async(id) => {
        set({ loading: true })
        try {
            const { formData } = get()
            const response = await axios.post(`${BASE_URL}/api/products/${id}`, formData)
            set({ currentProduct: response.data.data })
            toast.success("Product updated successfully")
        } catch (err) {
            console.log("Error fetching product", err)
            toast.error("Something went wrong")
            set({ error: "Something Went Wrong ", currentProduct: null })
        } finally {
            set({ loading: false })
        }
    }
}))