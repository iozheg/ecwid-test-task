import { queryOptions } from '@tanstack/vue-query';
import {
  getProduct,
  getProducts,
  type GetProductParams,
  type GetProductsParams,
} from './products';

export const productsQueryOptions = (params: GetProductsParams) =>
  queryOptions({
    queryKey: ['products', params.categoryId, params.subcategoriesIds],
    queryFn: () => getProducts(params),
  });

export const productQueryOptions = (params: GetProductParams) =>
  queryOptions({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(params),
  });
