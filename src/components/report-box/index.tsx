import { getMemberReport, getSuggestReport } from '@/apis/store/store';
import { Card, Text, Spacer, Input, Button, Toggle } from '@geist-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function ReportBox() {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isReported, setIsReported] = useState<string>('');
  const [isMemberReport, setIsMemberReport] = useState(true);
  const [result, setResult] = useState<string[]>([]);

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === 'nickname') setNickname(value);
    else if (fieldName === 'email') setEmail(value);
    else setIsReported(value);
  };

  useQuery<string[]>(
    ['reportList'],
    async () => {
      if (isMemberReport) {
        const { data } = await getMemberReport();
        return data.content;
      }
      const { data } = await getSuggestReport();
      return data.content;
    },
    {
      onSuccess: resp => {
        console.log('resp', resp);
        setResult(resp);
      },
      onError: err => console.log('!!', err),
    },
  );

  const handleSubmit = () => {};

  const handleToggle = () => {
    setIsMemberReport(prevState => !prevState);
  };

  return (
    <Card>
      <Text h3>리포트</Text>
      <Spacer />
      <Toggle checked={isMemberReport} onChange={handleToggle} />{' '}
      {isMemberReport ? <text>멤버 신고</text> : <text>건의 사항</text>}
      <Spacer />
      {isMemberReport ? (
        <Input
          label="신고인 검색"
          width="95%"
          crossOrigin={undefined}
          value={nickname}
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
        onChange={e => handleInputChange(nickname, e.target.value)}
      />
      <Input
        label="이메일 검색"
        width="95%"
        crossOrigin={undefined}
        value={email}
        onChange={e => handleInputChange(email, e.target.value)}
      />
      <Spacer />
      <Button type="secondary" onClick={handleSubmit}>
        검색
      </Button>
    </Card>
  );
}
