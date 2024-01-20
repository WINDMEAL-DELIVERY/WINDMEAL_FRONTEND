import { ChatInstance } from '@/apis';

export const getChattingList = async () => {
  const { data } = await ChatInstance.get('/chat/chatroom');
  return data;
};
