import { IconRefresh, IconDown } from 'public/svgs';
import {
  OptionButton,
  OptionText,
  OptionButtonContainer,
} from '@components/option-button-container/styles';
import { useRecoilState } from 'recoil';
import { mapStoreState } from '@/states/mapOption';

export default function OptionButtonComponent({
  handleClickOption,
  isMap,
}: {
  handleClickOption: (optionId: number) => void;
  isMap: boolean;
}) {
  const [option, setOption] = useRecoilState(mapStoreState);

  const handleClickIsOpen = () => {
    setOption({
      ...option,
      ...{ isOpen: true },
    });
  };

  return (
    <OptionButtonContainer $isMap={isMap}>
      <OptionButton>
        <OptionText onClick={() => handleClickOption(-1)}>초기화</OptionText>
        <IconRefresh />
      </OptionButton>
      <OptionButton onClick={() => handleClickOption(1)}>
        <OptionText>도착시간</OptionText>
        <IconDown />
      </OptionButton>
      <OptionButton onClick={() => handleClickOption(2)}>
        <OptionText>배달지</OptionText>
        <IconDown />
      </OptionButton>
      <OptionButton onClick={() => handleClickOption(3)}>
        <OptionText>음식종류</OptionText>
        <IconDown />
      </OptionButton>
      {isMap && (
        <OptionButton>
          <OptionText onClick={handleClickIsOpen}>영업중</OptionText>
        </OptionButton>
      )}
    </OptionButtonContainer>
  );
}
