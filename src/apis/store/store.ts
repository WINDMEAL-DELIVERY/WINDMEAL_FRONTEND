import { instance } from '@/apis';
import { MapStoreProps } from '@/types/type';

export const getMapStoreList = async ({
  storeId,
  placeId,
  eta,
  storeCategory,
  isOpen,
}: MapStoreProps) => {
  let queryString = '';

  if (storeId !== undefined) {
    queryString += `storeId=${storeId}&`;
  }
  if (placeId !== undefined) {
    queryString += `placeId=${placeId}&`;
  }
  if (eta !== undefined) {
    queryString += `eta=${eta}&`;
  }
  if (storeCategory !== undefined) {
    queryString += `storeCategory=${storeCategory}&`;
  }
  if (isOpen !== undefined) {
    queryString += `isOpen=${isOpen}&`;
  }

  // 마지막 문자가 '&'이면 제거
  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }

  const { data } = await instance.get(`/store/map?${queryString}`);
  return data;
};
