import products from "../data/products";
import apiClient from "./apiClient";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";

export const productService = {
  async getProducts() {
    if (useMockApi) {
      return products;
    }

    const { data } = await apiClient.get("/products");
    return data;
  },

  async getProductById(productId) {
    if (useMockApi) {
      return products.find((product) => product.id === Number(productId)) || null;
    }

    const { data } = await apiClient.get(`/products/${productId}`);
    return data;
  },

  async getCategories() {
    const productList = await this.getProducts();

    return ["all", ...new Set(productList.map((product) => product.category))];
  },
};
