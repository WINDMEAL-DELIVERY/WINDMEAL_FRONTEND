import { MapStoreProps } from '@/types/type';
import { atom } from 'recoil';

const initialOption: MapStoreProps = {};

export const mapStoreState = atom({
  key: 'mapStoreState',
  default: initialOption,
});
