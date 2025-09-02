import { queryOptions } from '@tanstack/vue-query';
import { getCategories } from './categories';

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
