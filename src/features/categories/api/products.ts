import { API_URLS } from '@/api/axios';
import { getPaginatedEntity } from '@/api/requests';
import type {
  PaginatedRequestParams,
  PaginatedResponse,
  Product,
} from '@/api/types';

export type GetProductsParams = {
  categoryId: number;
  subcategoriesIds?: number[];
  includeProductsFromSubcategories?: boolean;
} & PaginatedRequestParams;

export const getProducts = async (
  params: GetProductsParams
): Promise<PaginatedResponse<Product>> => {
  const categoriesParam = params.subcategoriesIds?.length
    ? params.subcategoriesIds.join(',')
    : undefined;

  const response = await getPaginatedEntity<Product>(
    API_URLS.PRODUCTS,
    {
      category: params.categoryId,
      categories: categoriesParam,
      includeProductsFromSubcategories: params.includeProductsFromSubcategories,
    },
    params
  );
  return response;
};
