const STORAGE_TOKEN = "STORAGE_TOKEN";
const STORAGE_BASE_URL = "STORAGE_BASE_URL";

export const getToken = () => localStorage.getItem(STORAGE_TOKEN);
export const setToken = token => localStorage.setItem(STORAGE_TOKEN, token);
export const removeToken = () => localStorage.removeItem(STORAGE_TOKEN);

export const getBaseUrl = () => localStorage.getItem(STORAGE_BASE_URL);
export const setBaseUrl = baseUrl =>
  localStorage.setItem(STORAGE_BASE_URL, baseUrl);
export const removeBaseUrl = () => localStorage.removeItem(STORAGE_BASE_URL);
