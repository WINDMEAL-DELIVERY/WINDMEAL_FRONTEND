import { useRouter } from 'next/router';
import { IconLt } from 'public/svgs';
import {
  GoBack,
  Header,
  IconContainer,
  Icons,
  Title,
} from '@components/header/styles';
import { BulletinHeaderProps } from '@/types/type';

export default function PageHeader({
  icon1,
  icon2,
  title,
}: BulletinHeaderProps) {
  const router = useRouter();

  return (
    <Header>
      <GoBack onClick={router.back}>
        <IconLt />
      </GoBack>
      <Title>{title}</Title>
      <Icons>
        <IconContainer>{icon1}</IconContainer>
        <IconContainer>{icon2}</IconContainer>
      </Icons>
    </Header>
  );
}
// 아이콘에 디폴트로 cursor style 하는 방법?
