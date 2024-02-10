import Cookie from "universal-cookie";
import axios from "axios";

import { refreshTokens } from "@/api/auth.js";

const cookie = new Cookie();

const $api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
});

const useQueue = () => {
  let failedQueue = [];
  const isRefreshing = false;

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  return {
    failedQueue,
    isRefreshing,
    processQueue
  };
};

const setAxiosToken = (token) => {
  $api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : undefined;
};

const setTokens = ({ access, refresh }) => {
  cookie.set("accessToken", access, { path: "/" });
  cookie.set("refreshToken", refresh, { path: "/" });

  setAxiosToken(access);
};

setAxiosToken(cookie.get("accessToken"));

const handleError = (err) => {
  let { isRefreshing, failedQueue, processQueue } = useQueue();

  const originalRequest = err.config;

  if (err.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.value.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = token ? `Bearer ${token}` : undefined;
          return $api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      refreshTokens(cookie.get("refreshToken"))
        .then(({ data: { access_token, refresh_token } }) => {
          setTokens({ access: access_token, refresh: refresh_token });
          processQueue(null, access_token);

          resolve($api(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
};

$api.interceptors.response.use(undefined, handleError);

export { $api };
