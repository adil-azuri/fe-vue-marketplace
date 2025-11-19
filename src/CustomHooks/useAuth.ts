import { ref } from "vue";
import api from "../services/api";

export function useLogin() {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const token = ref<string | null>(null);

  const user = ref<any>(null);

  const login = async (username: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await api.post(
        "/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      token.value = res.data?.token;
      user.value = res.data?.user;

      // Simpan ke localStorage (optional)
      localStorage.setItem("token", token.value!);

      return true;
    } catch (err: any) {
      error.value = err?.response?.data?.message || "Login gagal";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    token,
    user,
    login,
  };
}
