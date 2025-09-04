import { API_URLS } from '@/api/axios';
import type { Category, PaginatedResponse } from '@/api/types';
import { getEntity, getPaginatedEntity } from '@/api/requests';

export const getCategories = async (
  parentId?: number,
  responseFields: string[] = []
): Promise<PaginatedResponse<Category>> => {
  const response = await getPaginatedEntity<Category>(
    API_URLS.CATEGORIES,
    {
      parent: parentId,
    },
    {
      responseFields,
    }
  );
  return response;
};

export const getCategoryById = async (
  id: number,
  responseFields: string[] = []
): Promise<Category | null> => {
  return getEntity<Category>(
    `${API_URLS.CATEGORIES}/${id}`,
    {},
    { responseFields }
  );
};
