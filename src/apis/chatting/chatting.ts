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

export const getChattingList = async (pageParam: number) => {
  const { data } = await ChatInstance.get(
    `/chat/chatroom?page=${pageParam}&size=10`,
  );
  const chattingList = data.data.chatroomSpecResponses.content;

  console.log(data);
  const orderIds = chattingList.map((chat: ChattingListProps) => chat.orderId);
  const orderInfoPromises = orderIds.map((orderId: number) =>
    getOrderInfo(orderId),
  );
  const orderInfoList = await Promise.all(orderInfoPromises);

  const chatList = chattingList.map(
    (chat: ChattingListProps, index: number) => ({
      ...chat,
      opponentProfileImage: `${imageURL}${chat.opponentProfileImage}`,
      orderInfo: orderInfoList[index].data,
      lastMessageTime: formattedTimeZone(chat.lastMessageTime),
    }),
  );

  const isLastPage = data.data.chatroomSpecResponses.last;
  const pageNumber = data.data.chatroomSpecResponses.number;

  return { chatList, isLastPage, pageNumber };
};

export const getChattingMessage = async (
  chatroomId: string,
  pageParam: number,
) => {
  const { data } = await ChatInstance.get(
    `/chat/${chatroomId}?page=${pageParam}`,
  );

  const messages = data.data.chatMessageSpecResponses.content.map(
    (chatMessage: ChattingMessageProps) => ({
      ...chatMessage,
      sendTime: formattedTimeZone(chatMessage.sendTime),
    }),
  );

  const isLastPage = data.data.chatMessageSpecResponses.last;
  const pageNumber = data.data.chatMessageSpecResponses.number;

  return { messages, isLastPage, pageNumber };
};

export const getImageUrl = async (formData: FormData) => {
  const { data } = await instance.post('/api/image', formData);
  return imageURL + data.data;
};
