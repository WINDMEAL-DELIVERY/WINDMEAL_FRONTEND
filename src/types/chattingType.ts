export interface ChattingListProps {
  chatroomId: string;
  lastMessage: string;
  messageType: string;
  createdDate: Date;
  uncheckedMessageCount: number;
  oppositeAlarmToken: string;
}
