import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    
    /**
     * Creates a new product.
     * @param {Object} newProduct - The new product to be created. Must contain name, image, and price.
     * @returns {Object} - {success: boolean, message: string}
     */
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })

        const data = await res.json()
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, message: "Product created successfully."}
    },

    /**
     * Fetches all products from the server and updates the state.
     * @returns {Promise<void>}
     */
    fetchProducts: async() => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products: data.data})
    },

    /**
     * Deletes a product from the server and updates the state.
     * @param {string} pid - The id of the product to be deleted.
     * @returns {Promise<Object>} - {success: boolean, message: string}
     */
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        })

        const data = await res.json()

        if(!data.success) return {success: false, message: data.message}

        set((state) => ({
            products: state.products.filter(product => product._id !== pid)
        }))

        return {succcess: true, message: data.message}
    },
    
    /**
     * Updates a product on the server and updates the state.
     * @param {string} pid - The id of the product to be updated.
     * @param {Object} updatedProduct - The updated product data.
     * @returns {Promise<Object>} - {success: boolean, message: string}
     */
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,{
             method: "PUT",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify(updatedProduct),
        })
        const data = await res.json()

        if(!data.success) return {success: false, message: data.message}

        set((state) => ({
            products: state.products.map(product => (product._id === pid ? data.data : product)),
        }))

        return {success: true, message: data.message}
    }
}))