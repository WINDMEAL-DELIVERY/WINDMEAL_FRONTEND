import ToggleButton from '@components/toggle-button';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 25rem;
`;

export default function Content() {
  return (
    <CardContainer>
      <ToggleButton />
    </CardContainer>
  );
}
