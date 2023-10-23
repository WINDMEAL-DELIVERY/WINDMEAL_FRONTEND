import LoginBtn from '@components/login-btn';
import { useSession } from 'next-auth/react';

export default function login() {
  const { data: session } = useSession();
  return (
    <div>
      <div>
        <LoginBtn />
        {session?.accessToken ? session?.accessToken : 'not signed up'}
      </div>
    </div>
  );
}
