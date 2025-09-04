import { queryOptions } from '@tanstack/vue-query';
import {
  getCategories,
  getCategoryById,
  type GetCategoriesParams,
} from './categories';

export const categoriesQueryOptions = (params: GetCategoriesParams) =>
  queryOptions({
    queryKey: ['categories', params.parentId],
    queryFn: () => getCategories(params),
  });

export const categoryQueryOptions = (
  id: number,
  responseFields: string[] = []
) =>
  queryOptions({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id, responseFields),
  });
