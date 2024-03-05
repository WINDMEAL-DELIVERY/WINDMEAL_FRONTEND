import { instance } from '@/apis';

export const getMyDelivery = async () => {
  const { data } = await instance.get('/delivery');
  return data;
};
