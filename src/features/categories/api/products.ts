import { API_URLS, axiosInstance } from '@/api/axios';
import type { Category, PaginatedResponse, Product } from '../../../api/types';

export const getProducts = async (
  categoriesIds: number[],
  limit: number
): Promise<PaginatedResponse<Product>> => {
  const response = await axiosInstance.get(API_URLS.PRODUCTS, {
    params: {
      categories: categoriesIds.join(','),
      limit,
    },
  });
  return response.data;
};

// export const getCategoryById = async (id: number): Promise<Category | null> => {
//   try {
//     const response = await axiosInstance.get(`${API_URLS.CATEGORIES}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching category with ID ${id}:`, error);
//     return null;
//   }
// };
