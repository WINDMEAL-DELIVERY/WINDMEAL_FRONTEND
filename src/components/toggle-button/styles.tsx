import styled from 'styled-components';

type ToggleType = {
  latestSort: boolean;
};

export const BtnWrapper = styled.div`
  display: flex;
  z-index: 0;
`;

export const CheckBox = styled.input`
  display: none;
`;

export const ButtonLabel = styled.label<ToggleType>`
  z-index: 10;
  /* 만들고자 하는 button 의 크기와 색상 */
  width: 20rem;
  height: 2.625rem;
  border-radius: 1.875em;
  background: var(--SubColor, #f2f4ff);

  // 무조건 after가 선택된 것, state가 true면 진행 선택, false면 요청 선택

  /* state가 false = 요청일 때의 before */
  &::before {
    display: flex;
    position: absolute;
    content: '배달 진행중';
    padding-left: 2.75em;
    /* 좌측에 text가 오게하기 위함 */
    justify-content: flex-start;
    align-items: center;
    /* before 요소가 이동할 경로의 길이만큼 width 지정 */
    width: 10rem;
    height: 2.625rem;
    color: var(--SubColor, #a8b1ce);
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;
    transition: all 0.2s ease-in-out;
  }

  /* state가 false = 요청일 때의 after */
  &::after {
    display: flex;
    position: relative;
    content: '배달 요청중';
    width: 10rem;
    height: 2.625rem;
    justify-content: center;
    align-items: center;
    /* false일 때는 우측에 있어야하므로 전체 길이의 반만큼 이동한 상태 */
    left: 10rem;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;
    border-radius: 2rem;
    background: white;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }

  /* state가 true = 진행일 때 배달 진행 중*/
  ${props =>
    props.latestSort &&
    `
    // 선택 안된 요청 칸 스타일 우선 적용 
    &::before { 
      padding-left: 7em;
      content: '배달 요청중';
       /* 우측에 text가 오도록 하기 위함 */
      justify-content: flex-end;
    };
    // 선택 된 진행 칸 스타일 우선 적용 
    &::after {
      content: '배달 진행중';
      width: 10rem;
      height: 2.625rem;
       /* true일 때는 좌측에 있어야함 */
      left: 0rem;
    }
  `}
`;
