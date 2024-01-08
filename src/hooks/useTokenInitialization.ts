import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export function useTokenInitialization() {
  const params = useSearchParams();
  const code = params.get('code')?.replace(/ /g, '+');
  useEffect(() => {
    if (code) {
      setCookie('token', code);
    }
  }, [code]);
}
