import { ChatInstance, instance } from '@/apis';
import { ChattingListProps } from '@type/chattingType';

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

  const updatedChattingList = chattingList.map(
    (chat: ChattingListProps, index: number) => ({
      ...chat,
      orderInfo: orderInfoList[index],
    }),
  );

  return updatedChattingList;
};
