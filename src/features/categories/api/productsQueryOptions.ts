import { queryOptions } from '@tanstack/vue-query';
import { getProducts, type GetProductsParams } from './products';

export const productsQueryOptions = (params: GetProductsParams) =>
  queryOptions({
    queryKey: ['products', params.categoryId, params.subcategoriesIds],
    queryFn: () => getProducts(params),
  });
