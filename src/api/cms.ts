import { authorizationClient } from '.';
import API from './config';

export const createStore = async (storeData: object) => {
  const { data } = await authorizationClient.post(API.STORE, storeData);
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
