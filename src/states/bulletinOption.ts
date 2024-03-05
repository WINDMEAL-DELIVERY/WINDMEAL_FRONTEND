import { BulletinProps } from '@/types/type';
import { atom } from 'recoil';

const initialOption: BulletinProps = {};

export const bulletinState = atom({
  key: 'bulletinState',
  default: initialOption,
});
