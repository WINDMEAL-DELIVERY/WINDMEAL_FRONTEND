import { Menu } from '@/types/type';
import { atom } from 'recoil';

const initialMenu: Menu = {
  menuCategoryId: 0,
  name: '',
  description: '',
  price: { price: 0 },
  menuId: 0,
};

export const menuState = atom({
  key: 'menuState',
  default: [initialMenu],
});
