import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";

export const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  details: () => [...productKeys.all, "detail"],
  detail: (productId) => [...productKeys.details(), productId],
};

export const useProducts = () => {
  const query = useQuery({
    queryKey: productKeys.lists(),
    queryFn: productService.getProducts,
  });

  return {
    ...query,
    products: query.data || [],
    loading: query.isLoading,
    error: query.error?.message || "",
  };
};

export const useProduct = (productId) => {
  const query = useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productService.getProductById(productId),
    enabled: Boolean(productId),
  });

  return {
    ...query,
    product: query.data || null,
    loading: query.isLoading,
    error: query.error?.message || "",
  };
};
