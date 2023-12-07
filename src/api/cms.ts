import { authorizationClient } from '.';
import API from './config';

export const getStoreList = async () => {
  const { data } = await authorizationClient.get(API.STORE);
  return data;
};

export const createStore = async (storeData: FormData) => {
  const { data } = await authorizationClient.post(API.STORE, storeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const createMenu = async (menuData: object) => {
  const { data } = await authorizationClient.post(API.MENU, menuData);
  return data;
};

export const createOption = async (menuId: number, optionData: object) => {
  const { data } = await authorizationClient.post(
    `${API.MENU}/${menuId}/option`,
    optionData,
  );
  return data;
};

export const createMenuCategory = async (storeId: number, category: object) => {
  const { data } = await authorizationClient.post(
    `${API.STORE}/${storeId}/menuCategory`,
    category,
  );
  return data;
};
