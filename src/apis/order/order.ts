import { instance } from '@/apis';
import { BulletinProps } from '@/types/type';

export const getMyOrder = async () => {
  const { data } = await instance.get('/delivery/order');
  return data;
};

export const getAllOrders = async ({
  storeId,
  placeId,
  eta,
  storeCategory,
}: BulletinProps) => {
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
  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }
  const { data } = await instance.get(`/order?${queryString}`);
  return data;
};
