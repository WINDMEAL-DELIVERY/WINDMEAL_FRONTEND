export interface ChattingListProps {
  chatroomId: string;
  lastMessage: string;
  messageType: string;
  lastMessageTime: number[];
  uncheckedMessageCount: number;
  opponentAlarmToken: string;
  opponentNickname: string;
  orderId: string;
}
