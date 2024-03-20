import FloatingHomeButton from '@/components/floating-home-button';
import ReportBox from '@/components/report-box';
import { CMSWrapper } from '@/styles/cmsStyles';
import { Spacer } from '@geist-ui/react';

export default function Report() {
  return (
    <CMSWrapper>
      <ReportBox />
      <Spacer style={{ marginTop: '3rem' }} />
      <FloatingHomeButton />
    </CMSWrapper>
  );
}
