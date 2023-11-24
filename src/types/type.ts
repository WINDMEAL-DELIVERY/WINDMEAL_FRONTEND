export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

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
