export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface AddfileProps {
  onImageUpload?: (imageFile: string) => void;
  imageUrl?: string;
}

export interface StoreListProps {
  name: string;
  storeId: number;
}

export interface InputNickNameProps {
  $focused: boolean;
  $special: boolean;
  $duplicated: boolean;
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

interface MenuName {
  menuName: string;
}

export interface Delivery {
  id: number;
  menus: MenuName[];
  storeName: string;
  destination: string;
  customerName: string;
  customerImg: string;
  status: string;
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

export interface OptionSpec {
  menuId: number;
  optionData: object;
}

export interface Option {
  name: string;
  isEssentialOption: boolean;
  isMultipleOption: boolean;
  optionSpec: OptionSpec;
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
