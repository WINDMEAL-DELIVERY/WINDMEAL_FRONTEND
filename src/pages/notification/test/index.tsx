import { instance } from '@/apis';

function Test() {
  const handlePushNotification = async () => {
    try {
      const { data } = await instance.get(`/api/member/alarm/test?msg=test`);
      alert(data);
    } catch (e) {
      alert(`Notification Error:${e as Error}`);
    }
  };
  return (
    <div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handlePushNotification}>알람 테스트</button>
    </div>
  );
}

export default Test;
