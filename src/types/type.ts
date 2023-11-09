interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}
