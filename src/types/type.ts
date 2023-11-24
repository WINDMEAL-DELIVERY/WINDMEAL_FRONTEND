export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface InputNickNameProps {
  isFocused: string;
  hasSpecialChar: string;
  isDuplicated: string;
}
