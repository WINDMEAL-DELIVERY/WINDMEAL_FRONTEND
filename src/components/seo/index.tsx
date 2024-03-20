import Head from 'next/head';

export default function Seo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Head>
      <title>{`${title} | 바람개비 딜리버리`}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="가천대, 가천대학교, 바람개비 딜리버리, 배달, 배달의 민족, 쿠팡이츠, 음식점"
      />
    </Head>
  );
}
