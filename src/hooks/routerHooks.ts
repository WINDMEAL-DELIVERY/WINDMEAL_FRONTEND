import { useRouter } from 'next/router';

export function useRedirect(link: string) {
  const router = useRouter();

  const redirectToLink = () => {
    router.replace(`/${link}`);
  };

  return redirectToLink;
}
