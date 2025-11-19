import { ref, onMounted } from "vue";
import api from "../services/api";

export function useProducts(limit: number | null = null) {
  const products = ref<any[]>([]);
  const sliderProducts = ref<any[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await api.get("/products");
      products.value = res.data.data.data;

      if (limit) {
        sliderProducts.value = products.value.slice(0, limit);
      }
    } catch (err: any) {
      error.value = err?.message || "Failed fetch Products";
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return {
    products,
    sliderProducts,
    loading,
    error,
    fetchProducts,
  };
}
