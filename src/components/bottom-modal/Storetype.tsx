import { StoreTypeInterface } from '@/types/type';
import {
  MapOptionContainer,
  MapOptionDescription,
  MapOptionList,
  MapOptionListContainer,
  MapOptionTitle,
  MapOptionWrapper,
} from '@components/bottom-modal/styles';
import { IconCheck } from 'public/svgs';
import { useState } from 'react';

export default function StoreType({ submitOption }: StoreTypeInterface) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleOptionClick = (category: string) => {
    setSelectedCategory(category);
    submitOption({ storeCategory: category });
  };

  return (
    <MapOptionWrapper>
      <MapOptionContainer>
        <MapOptionTitle>가게 종류</MapOptionTitle>
        <MapOptionDescription>
          조회하고 싶은 가게의 종류를 선택하세요.
        </MapOptionDescription>
      </MapOptionContainer>
      <MapOptionListContainer>
        <MapOptionList
          onClick={() => handleOptionClick('음식점')}
          $selected={selectedCategory === '음식점'}
        >
          음식점
          {selectedCategory === '음식점' && <IconCheck />}
        </MapOptionList>
        <MapOptionList
          onClick={() => handleOptionClick('카페')}
          $selected={selectedCategory === '카페'}
        >
          카페
          {selectedCategory === '카페' && <IconCheck />}
        </MapOptionList>
        <MapOptionList
          onClick={() => handleOptionClick('의약품')}
          $selected={selectedCategory === '의약품'}
        >
          의약품
          {selectedCategory === '의약품' && <IconCheck />}
        </MapOptionList>
      </MapOptionListContainer>
    </MapOptionWrapper>
  );
}
