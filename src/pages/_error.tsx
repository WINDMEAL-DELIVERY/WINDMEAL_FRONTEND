// pages/_error.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

interface ErrorPageProps {
  statusCode: string;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const router = useRouter();
  const { msg } = router.query;
  const errorMessage = msg ? atob(msg as string) : undefined;
  return (
    <div>
      <p>Error {statusCode}</p>
      {msg && <p>Message: {errorMessage}</p>}
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
