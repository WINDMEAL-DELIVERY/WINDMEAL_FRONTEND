import { useRouter } from 'next/router';
import { IconLt } from 'public/svgs';
import { GoBack, Header, Icons, Title } from '@components/header/styles';
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
        {icon1}
        {icon2}
      </Icons>
    </Header>
  );
}
