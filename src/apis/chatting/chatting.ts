import { ChatInstance, instance } from '@/apis';
import { ChattingListProps, ChattingMessageProps } from '@type/chattingType';

const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL as string;

function formattedTimeZone(dateTimeString: string) {
  const inputDate = new Date(dateTimeString);
  return new Date(inputDate.getTime() + 9 * 60 * 60 * 1000);
}

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
    lastMessageTime: formattedTimeZone(chat.lastMessageTime),
  }));
};

export const getChattingMessage = async (chatroomId: string) => {
  const { data } = await ChatInstance.get(`/chat/${chatroomId}`);

  return data.data.chatMessageSpecResponses.content.map(
    (chatMessage: ChattingMessageProps) => ({
      ...chatMessage,
      sendTime: formattedTimeZone(chatMessage.sendTime),
    }),
  );
};

export const getImageUrl = async (formData: FormData) => {
  const { data } = await instance.post('/api/image', formData);
  return imageURL + data.data;
};
