import { instance } from '@/apis';
import {
  MenuCategoryParameter,
  OptionSpecParam,
  StoreCategorySpec,
} from '@/types/type';

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
  const { data } = await instance.post('/menu', menuData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const createOption = async ({ menuId, optionData }: OptionSpecParam) => {
  const { data } = await instance.post(`/menu/${menuId}/option`, optionData);
  return data;
};

export const getOption = async (menuId: number) => {
  const { data } = await instance.get(`/menu/${menuId}/option`);
  return data;
};

export const createMenuCategory = async ({
  storeId,
  category,
}: MenuCategoryParameter) => {
  const { data } = await instance.post(
    `/store/${storeId}/menuCategory`,
    category,
  );
  return data;
};

export const createStoreCategory = async ({
  storeId,
  category,
}: StoreCategorySpec) => {
  const { data } = await instance.post(`/cms/store/${storeId}/storeCategory`, {
    storeId,
    name: category,
  });
  return data;
};

export const getMemberReport = async () => {
  const { data } = await instance.get(`/api/member/report`);
  return data;
};

export const getSuggestReport = async () => {
  const { data } = await instance.get(`/report`);
  return data;
};
