const STORAGE_TOKEN = "STORAGE_TOKEN";

export const getToken = () => localStorage.getItem(STORAGE_TOKEN);

export const setToken = token => localStorage.setItem(STORAGE_TOKEN, token);

export const removeToken = () => localStorage.removeItem(STORAGE_TOKEN);
