import { ReactNode } from 'react';

export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface AddfileProps {
  onImageUpload?: (imageFile: string) => void;
  imageUrl?: string;
  onSubmit?: boolean;
}

export interface StoreListProps {
  name: string;
  storeId: number;
}

export interface InputNickNameProps {
  $focused: boolean;
  $special: boolean;
  $duplicated: boolean;
  $validated: boolean;
  $error: boolean;
}

export interface GuideMessageType {
  specialChar: string;
  duplicated: string;
  validated: string;
}

// export interface MenuCategory {
//   menuCategoryId: number;
//   storeId: number;
//   name: string;
// }

export interface MyDelivery {
  deliveryId: number;
  orderId: number;
  deliveryStatus: string;
  summary: string;
  description: string;
  destinationName: string;
  nickName: string;
  storeName: string;
}

export interface MyOrder {
  orderId: number;
  orderStatus: string;
  summary: string;
  description: string;
  destinationName: string;
  nickName: string;
  storeName: string;
}

export interface StoreCategoryTag {
  value: string;
  label: string;
  storeId?: number;
}

export interface AutoCompleteType {
  value: string;
  label: string;
  storeId: number;
}

export interface AddStoreProps {
  handleAddStore: (newStore: StoreListProps) => void;
}

export interface Menu {
  menuCategoryId: number;
  name: string;
  description: string;
  price: object;
  photo?: string;
  menuId: number;
}

export interface MenuCategory {
  menuCategoryId: number;
  name: string;
  menus?: Menu[];
}

export interface StoreProp {
  storeId: number;
  longitude: number;
  latitude: number;
  orderCount: number;
  storeName: string;
}

export interface MenuCategoryParameter {
  storeId: number;
  category: object;
}

export interface OptionSpecParam {
  menuId: number;
  optionData: object;
}

export interface OptionSpec {
  optionGroupId?: number;
  optionSpecId?: number;
  name: string;
  price: number;
}

export interface Option {
  name: string;
  isEssentialOption: boolean;
  isMultipleOption: boolean;
  optionSpecs: OptionSpec[];
}

export type OptionTypeBase = { label: string; value: string };

export type ValueType<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean = false,
> = IsMulti extends true ? OptionType[] : OptionType | null;

export interface StoreCategory {
  categoryId: number;
  name: string;
  storeCategoryId: number;
}

export interface StoreIdProp {
  storeId: number;
}

export interface StoreCategorySpec {
  category: string;
  storeId: number;
}

export interface StoreInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  memberId: number;
  name: string;
  phoneNumber: string;
  openTime: string;
  closeTime: string;
  placeName: string;
  longitude: string;
  latitude: string;
  categoryList: string[];
}

export interface MenuInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  menuCategoryId: string;
  name: string;
  description: string;
  price: number;
}

export interface ReportContent {
  title: string;
  content: string;
  reportedEmail?: string;
  reporterEmail?: string;
  email?: string;
}

export interface MarkerIcon {
  name: string;
  requests: number | undefined;
}

export interface BottomModalProps {
  content: React.ReactNode;
}

export interface headerBar {
  isHeaderBar?: boolean;
  onCloseModal?: () => void;
}

export interface MapStoreProps {
  storeId?: number;
  placeId?: number;
  eta?: string;
  storeCategory?: string;
  isOpen?: boolean;
}

export interface BulletinProps {
  storeId?: number;
  placeId?: number;
  eta?: string;
  storeCategory?: string;
}

export interface StoreTypeInterface {
  submitOption: (newOptions?: object) => void;
}

export interface BulletinHeaderProps {
  icon1: ReactNode;
  icon2?: ReactNode;
  title: string;
}

export interface Order {
  id: number;
  memberId: number;
  memberNickName: string;
  placeName: string;
  longitude: number;
  latitude: number;
  eta: string;
  deliveryFee: number;
  name: string;
  summary: string;
}
