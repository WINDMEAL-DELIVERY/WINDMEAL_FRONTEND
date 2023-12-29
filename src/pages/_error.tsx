// pages/_error.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ErrorPageProps } from '@type/errorType';

function ErrorPage({ statusCode }: ErrorPageProps) {
  const router = useRouter();
  const { msg } = router.query;
  const buffer = Buffer.from(msg as string, 'base64');
  const errorMessage = buffer.toString();

  // 추후에 모달 확정 시 재사용성 있게 변경할 예정입니다.
  useEffect(() => {
    if (errorMessage === '가천대학교 계정이 아닙니다. 토큰을 취소합니다.') {
      alert(
        '가천대학교 계정으로만 로그인 할 수 있습니다. 다시 로그인해 주시기를 바랍니다.',
      );
      router.replace('/login');
    }
  }, []);
  return (
    <div>
      <h1>Error {statusCode}</h1>
      {errorMessage && <p>Message: {errorMessage}</p>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ErrorPageProps
> = async context => {
  const statusCode = context.res ? context.res.statusCode : 404;
  return { props: { statusCode: statusCode.toString() } };
};

export default ErrorPage;
