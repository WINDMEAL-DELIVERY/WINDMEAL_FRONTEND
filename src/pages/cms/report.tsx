import ReportBox from '@/components/report-box';
import BottomTab from '@components/bottom-tab';
import { Spacer } from '@geist-ui/react';
import { Wrapper } from '@styles/styles';

export default function Report() {
  return (
    <Wrapper>
      <ReportBox />
      <Spacer style={{ marginTop: '3rem' }} />
      <BottomTab />
    </Wrapper>
  );
}
