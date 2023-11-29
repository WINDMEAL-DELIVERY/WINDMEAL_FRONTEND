export interface MyMapProps {
  selected: string | undefined;
  selectFlag: number;
  handleSelect: (selectedValue: string) => void;
}

export interface AddfileProps {
  onImageUpload?: (imageFile: string) => void;
  imageUrl?: string;
}
