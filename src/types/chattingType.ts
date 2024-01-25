export interface ChattingOrderProps {
  storeName: string;
  placeName: string;
  orderStatus: string;
  orderMenu: [];
}

export interface ChattingListProps {
  chatroomId: string;
  lastMessage: string;
  messageType: string;
  lastMessageTime: string;
  uncheckedMessageCount: number;
  opponentAlarmToken: string;
  opponentNickname: string;
  orderId: string;
  orderInfo?: ChattingOrderProps;
}
