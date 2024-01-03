import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@styles/styles';
import { useRouter } from 'next/router';
import { Card, Text, Spacer, Input, Button, Checkbox } from '@geist-ui/react';
import { createOption, getOption } from '@/apis/store/store';
import { useState } from 'react';
import { StoreContainer, StyledText } from '@pages/cms/styles';
import { Option } from '@/types/type';
import { useMutation, useQuery } from 'react-query';

export default function CMSMenu() {
  const router = useRouter();
  const { mid: menuId } = router.query;
  const [optionList, setOptionList] = useState<Option[]>([]);
  const [inputData, setInputData] = useState({
    name: '',
    isEssentialOption: false,
    isMultipleOption: true,
    optionSpecs: [{ name: '', price: 0 }],
  });

  useQuery(
    ['option'],
    async () => {
      const { data } = await getOption(Number(menuId));
      return data;
    },
    {
      onSuccess: optionData => {
        console.log('optionData11', optionData);
        setOptionList(optionData.optionGroups);
      },
    },
  );

  const handleInputChange = (fieldName: string, value: string | boolean) => {
    setInputData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleAddOption = () => {
    setInputData(prevData => ({
      ...prevData,
      optionSpecs: [...prevData.optionSpecs, { name: '', price: 0 }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setInputData(prevData => {
      const newOptionSpecs = [...prevData.optionSpecs];
      newOptionSpecs.splice(index, 1);
      return { ...prevData, optionSpecs: newOptionSpecs };
    });
  };

  const handleOptionChange = (
    index: number,
    fieldName: string,
    value: string,
  ) => {
    setInputData(prevData => {
      const newOptionSpecs = [...prevData.optionSpecs];
      newOptionSpecs[index] = { ...newOptionSpecs[index], [fieldName]: value };
      return { ...prevData, optionSpecs: newOptionSpecs };
    });
  };

  const mutateOption = useMutation(createOption, {
    onSuccess: response => {
      console.log('createOption', response);
      setOptionList(prev => [...prev, inputData]);
    },
    onError: error => {
      console.log('error', error);
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('inputData', inputData);
    mutateOption.mutate({
      menuId: Number(menuId),
      optionData: inputData,
    });
  };

  const renderInputs = () => {
    return (
      <>
        <Input
          label="옵션 이름"
          name="name"
          width="95%"
          crossOrigin={undefined}
          onChange={e => handleInputChange('name', e.target.value)}
        />
        <Spacer h={0.5} />
        <div style={{ margin: '0.5rem 0.3rem', display: 'flex' }}>
          <Checkbox
            checked={inputData.isEssentialOption}
            onChange={e =>
              handleInputChange('isEssentialOption', e.target.checked)
            }
          >
            필수 여부
          </Checkbox>
          <Spacer w={1} />
          <Checkbox
            checked={inputData.isMultipleOption}
            onChange={e =>
              handleInputChange('isMultipleOption', e.target.checked)
            }
          >
            중복 가능
          </Checkbox>
          <Spacer h={1.5} />
        </div>
        {inputData.optionSpecs.map((optionSpec, index) => (
          <>
            <Input
              label={`옵션명 ${index + 1}`}
              name={`optionName_${index}`}
              width="95%"
              crossOrigin={undefined}
              onChange={e => handleOptionChange(index, 'name', e.target.value)}
            />
            <Input
              label={`가격 ${index + 1}`}
              name={`optionPrice_${index}`}
              width="95%"
              crossOrigin={undefined}
              onChange={e => handleOptionChange(index, 'price', e.target.value)}
            />
            <Spacer h={0.5} />
            <Button
              auto
              scale={0.75}
              type="error-light"
              onClick={() => handleRemoveOption(index)}
            >
              옵션 제거
            </Button>
            <Spacer />
          </>
        ))}
        <Button auto scale={0.75} type="success" onClick={handleAddOption}>
          옵션 추가
        </Button>
      </>
    );
  };

  return (
    <Wrapper>
      <Card>
        <StoreContainer>
          {optionList.map((option: Option) => (
            <StyledText key={option.name}>
              {option.name}{' '}
              {option.optionSpecs?.map(spec => (
                <Text key={spec.optionSpecId}>{spec.name}</Text>
              ))}
            </StyledText>
          ))}
        </StoreContainer>
      </Card>
      <Card>
        <Text h3>옵션 생성</Text>
        <Spacer />
        <form onSubmit={handleSubmit}>
          {renderInputs()}
          <Spacer />
          <Button type="secondary" onClick={handleSubmit}>
            제출
          </Button>
        </form>
        <Spacer style={{ marginTop: '3rem' }} />
      </Card>
      <BottomTab />
    </Wrapper>
  );
}
