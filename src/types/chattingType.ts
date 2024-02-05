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
  opponentProfileImage: string;
  opponentAlarmToken: string;
  opponentNickname: string;
  orderId: string;
  orderInfo?: ChattingOrderProps;
}

export interface ChattingProps {
  messageId: string;
  fromMe: boolean;
  message: string;
  messageType: string;
  senderId: number;
  sendTime: string;
}
