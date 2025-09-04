import { queryOptions } from '@tanstack/vue-query';
import { getCategories, getCategoryById } from './categories';

export const categoriesQueryOptions = (
  parentId?: number,
  responseFields: string[] = []
) =>
  queryOptions({
    queryKey: ['categories', parentId],
    queryFn: () => getCategories(parentId, responseFields),
  });

export const categoryQueryOptions = (
  id: number,
  responseFields: string[] = []
) =>
  queryOptions({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id, responseFields),
  });
