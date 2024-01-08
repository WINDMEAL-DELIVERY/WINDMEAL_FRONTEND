import { getMemberReport, getSuggestReport } from '@/apis/store/store';
import { ReportContent } from '@/types/type';
import { Card, Text, Spacer, Input, Button, Toggle } from '@geist-ui/react';
import { useState } from 'react';

export default function ReportBox() {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isReported, setIsReported] = useState<string>('true');
  const [isMemberReport, setIsMemberReport] = useState(true);
  const [result, setResult] = useState<ReportContent[]>([]);

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === 'nickname') setNickname(value);
    else if (fieldName === 'email') setEmail(value);
    else {
      setIsReported(value ? 'true' : 'false');
    }
  };

  const suggestReport = async () => {
    try {
      const { data } = await getSuggestReport(nickname, email);
      setResult(data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const memberReport = async () => {
    try {
      const { data } = await getMemberReport(nickname, email, isReported);
      setResult(data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = () => {
    if (isMemberReport) {
      memberReport();
    } else {
      suggestReport();
    }
    setEmail('');
    setNickname('');
  };

  const handleToggle = () => {
    setIsMemberReport(prevState => !prevState);
    setResult([]);
    setEmail('');
    setNickname('');
  };

  return (
    <Card>
      <>
        <Text h3>REPORT</Text>
        <Spacer />
        <Toggle checked={isMemberReport} onChange={handleToggle} />{' '}
        {isMemberReport ? <text>멤버 신고</text> : <text>건의 사항</text>}
        <Spacer />
        {isMemberReport ? (
          <Input
            label="신고인 검색"
            width="95%"
            crossOrigin={undefined}
            value={isReported}
            onChange={e => handleInputChange(isReported, e.target.value)}
          />
        ) : (
          ''
        )}
        <Input
          label="닉네임 검색"
          width="95%"
          crossOrigin={undefined}
          value={nickname}
          onChange={e => handleInputChange('nickname', e.target.value)}
        />
        <Input
          label="이메일 검색"
          width="95%"
          crossOrigin={undefined}
          value={email}
          onChange={e => handleInputChange('email', e.target.value)}
        />
        <Spacer />
        <Button type="secondary" onClick={handleSubmit}>
          검색
        </Button>
        <Spacer />
      </>
      {result.map(report => (
        <>
          <Text>{report.title}</Text>
          <Text>{report.content}</Text>
          {isMemberReport ? (
            <>
              <Text>신고자 {report.reporterEmail}</Text>
              <Text>피신고자 {report.reportedEmail}</Text>
              <Spacer />
            </>
          ) : (
            <>
              <Text>신고자 {report.email}</Text>
              <Spacer />
            </>
          )}
        </>
      ))}
    </Card>
  );
}
