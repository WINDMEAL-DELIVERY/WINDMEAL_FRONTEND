import { instance } from '@/apis';

export const getMapStoreList = async () => {
  const { data } = await instance.get('/store/map');
  return data;
};
