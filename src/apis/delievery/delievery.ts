import { instance } from '@/apis';

export const getMyDelivery = async () => {
  const { data } = await instance.get('/delivery');
  return data;
};

export const getMyOrder = async () => {
  const { data } = await instance.get('/delivery/order');
  return data;
};
