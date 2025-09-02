import { queryOptions } from '@tanstack/vue-query';
import { getProducts } from './products';

export const productsQueryOptions = (categoriesIds: number[], limit: number) =>
  queryOptions({
    queryKey: ['products', categoriesIds],
    queryFn: () => getProducts(categoriesIds, limit),
  });
