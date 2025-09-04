import { API_URLS } from '@/api/axios';
import type { Category, PaginatedResponse } from '@/api/types';
import { getEntity, getPaginatedEntity } from '@/api/requests';

export type GetCategoriesParams = {
  parentId?: number;
  responseFields?: string[];
};

export const getCategories = async (
  params: GetCategoriesParams = {}
): Promise<PaginatedResponse<Category>> => {
  const response = await getPaginatedEntity<Category>(
    API_URLS.CATEGORIES,
    {
      parent: params.parentId,
    },
    {
      responseFields: params.responseFields,
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
