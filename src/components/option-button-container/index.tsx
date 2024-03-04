import { IconRefresh, IconDown } from 'public/svgs';
import {
  OptionButton,
  OptionText,
  OptionButtonContainer,
} from '@components/option-button-container/styles';
import { useRecoilState } from 'recoil';
import { storeState } from '@/states/mapOption';

export default function OptionButtonComponent({
  handleClickOption,
}: {
  handleClickOption: (optionId: number) => void;
}) {
  const [option, setOption] = useRecoilState(storeState);

  const handleClickIsOpen = () => {
    setOption({
      ...option,
      ...{ isOpen: true },
    });
  };

  return (
    <OptionButtonContainer>
      <OptionButton>
        <OptionText onClick={() => setOption({})}>초기화</OptionText>
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
      <OptionButton>
        <OptionText onClick={handleClickIsOpen}>영업중</OptionText>
      </OptionButton>
    </OptionButtonContainer>
  );
}
