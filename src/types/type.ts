export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface MenuCategory {
  menuCategoryId: number;
  storeId: number;
  name: string;
}

export interface storeProp {
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

interface Menu {
  menuName: string;
}

export interface Delivery {
  id: number;
  menus: Menu[];
  storeName: string;
  destination: string;
  customerName: string;
  customerImg: string;
  status: string;
}
