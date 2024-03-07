import { BulletinProps } from '@/types/type';
import { atom } from 'recoil';

const initialOption: BulletinProps = {};

export const bulletinStoreState = atom({
  key: 'bulletinStoreState',
  default: initialOption,
});
