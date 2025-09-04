import { axiosInstance } from './axios';
import type {
  EcwidEntityParams,
  PaginatedRequestParams,
  PaginatedResponse,
} from './types';

export const getPaginatedEntity = async <TEntity>(
  url: string,
  entityParams: Record<string, any>,
  initialParams: PaginatedRequestParams
): Promise<PaginatedResponse<TEntity>> => {
  const responseFields = `limit,total,count,offset,items(${
    initialParams.responseFields?.join(',') || ''
  })`;
  const response = await axiosInstance.get(url, {
    params: { ...entityParams, responseFields, limit: initialParams.limit },
  });
  return response.data;
};

export const getEntity = async <TEntity>(
  url: string,
  params: Record<string, any>,
  initialParams: EcwidEntityParams
): Promise<TEntity | null> => {
  const responseFields = initialParams.responseFields?.join(',') || '';
  const response = await axiosInstance.get(url, {
    params: { ...params, responseFields },
  });
  return response.data;
};
