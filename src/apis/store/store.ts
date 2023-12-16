import { instance } from '@/apis';

export const getStoreList = async () => {
  const { data } = await instance.get('/store');
  return data;
};

export const getStoreInfo = async (storeId: number) => {
  const { data } = await instance.get(`/cms/store/${storeId}`);
  return data;
};

export const createStore = async (storeData: FormData) => {
  const { data } = await instance.post('/store', storeData);
  return data;
};

export const createMenu = async (menuData: object) => {
  const { data } = await instance.post('/menu', menuData);
  return data;
};

export const createOption = async (menuId: number, optionData: object) => {
  const { data } = await instance.post(`/menu/${menuId}/option`, optionData);
  return data;
};

export const createMenuCategory = async (storeId: number, category: object) => {
  const { data } = await instance.post(
    `/store/${storeId}/menuCategory`,
    category,
  );
  return data;
};
