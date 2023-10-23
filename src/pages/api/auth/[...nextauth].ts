import NextAuth, { User, JWTCallback, SessionCallback } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, account, user }: JWTCallback) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return token;
    },

    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }: SessionCallback) {
      return {
        ...session, // 기존 세션 객체의 속성을 복사
        user: token.user as User,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        error: token.error,
      };
    },
    async signIn({ user }: { user: User }) {
      const emailDomain = user.email?.split('@')[1];

      if (emailDomain === 'gachon.ac.kr') {
        return true; // 허용
      }
      return false; // 거부
    },
  },
};

export default NextAuth(authOptions);
