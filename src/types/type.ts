export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface InputNickNameDivProps {
  isFocused: string;
  hasSpecialChar: string;
}
