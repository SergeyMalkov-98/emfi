import { $api } from "@/utils/axios";

import { useState } from "#app";
import Cookie from "universal-cookie";

const useCore = () => {
  const cookie = new Cookie();

  const accessCookie = useCookie("accessToken", { path: "/" });
  const refreshCookie = useCookie("refreshToken", { path: "/" });

  const accessToken = useState("accessToken", () => accessCookie.value);
  const refreshToken = useState("refreshToken", () => refreshCookie.value);

  const setAxiosToken = (token) => {
    $api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : undefined;
  };

  const setTokens = ({ access, refresh }) => {
    accessToken.value = access;
    refreshToken.value = refresh;

    cookie.set("accessToken", access, { path: "/" });
    cookie.set("refreshToken", refresh, { path: "/" });

    setAxiosToken(access);
  };

  const resetTokens = async () => {
    setTokens({ access: undefined, refresh: undefined });
  };

  setAxiosToken(accessToken.value);

  const isAuth = computed(() => !!accessToken.value && !!refreshToken.value);

  return {
    accessToken,
    refreshToken,
    isAuth,

    setTokens,
    resetTokens,
  };
};


export default function useAuth() {
  return {
    ...useCore(),
  };
}
