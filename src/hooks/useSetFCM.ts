import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { useMutation } from 'react-query';
import { FCMTokenRequest, FCMTokenResponse } from '@type/userType';
import { AxiosError } from 'axios';
import { setUserFCMToken } from '@apis/user/fcm';

export function useSetFCM() {
  const [alarmToken, setAlarmToken] = useState({
    alarmToken: '',
  });

  const FCMTokenMutation = useMutation<
    FCMTokenResponse,
    AxiosError,
    FCMTokenRequest
  >('alarmToken', (data: FCMTokenRequest) => setUserFCMToken(data), {
    onSuccess: data => {
      console.log('사용자 정보', JSON.stringify(data));
    },
    onError: err => {
      console.log(err);
    },
  });
  const MessageFCM = async () => {
    try {
      // 알람 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('알람 권한이 거부되었습니다.');
        return;
      }

      const firebaseApp = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      });

      const messaging = getMessaging(firebaseApp);

      // FCM 토큰 가져오기
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (currentToken) {
        setAlarmToken({
          alarmToken: currentToken,
        });
        // 토큰 전송 또는 필요한 동작 수행
        FCMTokenMutation.mutate(alarmToken);
      } else {
        console.warn('알림이 허용되지 않아, 토큰 발급에 실패했습니다.');
      }
    } catch (error) {
      console.error(
        '알람 토큰을 발급하거나 메시지를 수신하는 동안 오류가 발생했습니다.',
        error,
      );
    }
  };
  useEffect(() => {
    MessageFCM();
  }, []);
}
