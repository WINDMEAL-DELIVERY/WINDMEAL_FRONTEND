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

export interface Delivery {
  deliveryId: number;
  orderId: number;
  deliveryStatus: string;
  summary: string;
  description: string;
  destinationName: string;
  nickName: string;
  storeName: string;
}

export interface StoreCategoryTag {
  value: string;
  label: string;
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
  name: string;
  phoneNumber?: string;
  photo?: string;
  openTime?: string;
  closeTime?: string;
  location: {
    x: number;
    y: number;
  };
  menuCategories?: MenuCategory[];
  open?: boolean;
  requests?: number;
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
  storeId?: number;
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
