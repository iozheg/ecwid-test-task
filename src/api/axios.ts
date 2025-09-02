import axios from 'axios';

const baseUrl = 'https://app.ecwid.com/api/v3/108362264';

const publicToken = 'public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || baseUrl,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${publicToken}`,
  },
});

export const API_URLS = {
  CATEGORIES: `${baseUrl}/categories`,
  PRODUCTS: `${baseUrl}/products`,
};
