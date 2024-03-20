import { useRouter } from 'next/router';
import { IconHome } from 'public/svgs';
import styled from 'styled-components';

const FloatingButtom = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #5776b9;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
`;

export default function FloatingHomeButton() {
  const router = useRouter();
  const handleFloatingClick = () => {
    router.push('/main');
  };

  return (
    <FloatingButtom onClick={handleFloatingClick}>
      <IconHome />
    </FloatingButtom>
  );
}
