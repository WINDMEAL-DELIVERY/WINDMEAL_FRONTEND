import styled from 'styled-components';
import CardView from '@components/card-view';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Content() {
  return (
    <CardContainer>
      <CardView />
    </CardContainer>
  );
}
