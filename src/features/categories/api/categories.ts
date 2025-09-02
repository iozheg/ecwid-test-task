import { API_URLS, axiosInstance } from '@/api/axios';
import type { Category, PaginatedResponse } from '../../../api/types';

export const getCategories = async (): Promise<PaginatedResponse<Category>> => {
  const response = await axiosInstance.get(API_URLS.CATEGORIES);
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  try {
    const response = await axiosInstance.get(`${API_URLS.CATEGORIES}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
};
