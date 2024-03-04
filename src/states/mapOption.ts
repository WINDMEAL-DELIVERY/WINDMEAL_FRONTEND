import { MapStoreProps } from '@/types/type';
import { atom } from 'recoil';

const initialOption: MapStoreProps = {};

export const storeState = atom({
  key: 'storeState',
  default: initialOption,
});
