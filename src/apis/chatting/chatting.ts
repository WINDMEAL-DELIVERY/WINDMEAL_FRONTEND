import { ChatInstance, instance } from '@/apis';
import { ChattingListProps } from '@type/chattingType';
import { getCookie } from 'cookies-next';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL as string;

// 추후 해당 API 구현 되면 삭제 예정
export const getOrderInfo = async (orderId: number) => {
  const { data } = await instance.get(`/order/${orderId}`);
  return data;
};

export const getChattingList = async () => {
  const { data } = await ChatInstance.get('/chat/chatroom');
  const chattingList = data.data.chatroomSpecResponses.content;

  const orderIds = chattingList.map((chat: ChattingListProps) => chat.orderId);
  const orderInfoPromises = orderIds.map((orderId: number) =>
    getOrderInfo(orderId),
  );
  const orderInfoList = await Promise.all(orderInfoPromises);

  return chattingList.map((chat: ChattingListProps, index: number) => ({
    ...chat,
    opponentProfileImage: `${imageURL}${chat.opponentProfileImage}`,
    orderInfo: orderInfoList[index].data,
  }));
};

export const getChatting = async (chatroomId: string) => {
  const { data } = await ChatInstance.get(`/chat/${chatroomId}`);
  return data.data.chatMessageSpecResponses.content;
};

export const chatConnect = async (
  chatroomId: string,
  opponentAlarmToken: string,
) => {
  const token: string = (await getCookie('token')) || '';
  if (token !== '') {
    const uri = encodeURIComponent(token);
    const alarmUri = encodeURIComponent(opponentAlarmToken);
    const stompUrl = `${
      process.env.NEXT_PUBLIC_STOMP_URL + uri
    }&code_a=${alarmUri}`;

    const { data } = await ChatInstance.get(`/chat/${chatroomId}`);
    return data.data.chatMessageSpecResponses.content;
  }
};
