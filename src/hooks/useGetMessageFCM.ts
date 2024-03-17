import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

export function useGetMessageFCM() {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

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

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then(currentToken => {
        if (currentToken) {
          console.log('Success to get registration token.')
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });

    onMessage(messaging, payload => {
      console.log('Message received. ', payload, messaging);
    });
  };
  useEffect(() => {
    onMessageFCM();
  }, []);
}
