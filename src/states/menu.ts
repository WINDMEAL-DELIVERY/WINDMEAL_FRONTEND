import { Menu } from '@/types/type';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const initialMenu: Menu = {
  menuCategoryId: 0,
  name: '',
  description: '',
  price: { price: 0 },
};

export const menuState = atom({
  key: 'menuState',
  default: [initialMenu],
  effects_UNSTABLE: [persistAtom],
});
