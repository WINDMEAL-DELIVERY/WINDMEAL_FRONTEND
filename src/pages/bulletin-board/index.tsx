/* eslint-disable import/no-extraneous-dependencies */
import BottomTab from '@components/bottom-tab';
import { Wrapper } from '@/styles/styles';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { Button } from '@geist-ui/core';

export default function BulletinBoard() {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
    };

    const firebaseApp = initializeApp(firebaseConfig);

    const messaging = getMessaging(firebaseApp);

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
      .then(currentToken => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
      });

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, payload => {
      console.log('Message received. ', payload);
    });
  };

  // 창 뜨게 해서 버튼 클릭 하도록
  function requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        // 푸시 거부됐을 때 처리할 내용
        console.log('Notification permission denied.');
      } else {
        // 푸시 승인됐을 때 처리할 내용
        console.log('Notification permission granted.');
      }
    });
  }

  // useEffect(() => {
  //   requestPermission();
  //   onMessageFCM();
  // }, []);

  const handleClickFCM = () => {
    onMessageFCM();
  };

  const handleClickRequest = () => {
    requestPermission();
  };

  return (
    <Wrapper>
      <div>게시판</div>
      <BottomTab />
      <Button onClick={handleClickFCM}>FCM</Button>
      <Button onClick={handleClickRequest}>request</Button>
    </Wrapper>
  );
}
