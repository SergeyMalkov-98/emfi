import { $api } from '@/utils/axios';  

/**
 * Обновить токены
 * @param {String} refreshToken Токен обновления
 */
const refreshTokens = async (refreshToken) => {
  const body = {
    client_id: import.meta.env.VITE_APP_CLIENT_ID,
    client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    redirect_uri: import.meta.env.VITE_APP_REDIRECT_URL
  };
  return await $api.post('/oauth2/access_token', body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: undefined
    }
  });
};

export {
  refreshTokens,
}; 