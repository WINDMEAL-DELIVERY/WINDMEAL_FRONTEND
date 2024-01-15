import { instance } from '@/apis';
import { AxiosResponse } from 'axios';
import { NicknameRequest, RegisterResponse } from '@type/userType';

// 닉네임 중복 확인
export const checkDuplicatedNickname = async (
  data: string,
): Promise<RegisterResponse> => {
  const res: AxiosResponse<RegisterResponse> = await instance.get(
    `/api/member/nickname/${data}/exists`,
  );
  return res.data;
};

// 닉네임 설정 완료
export const setUserNickname = async (
  data: NicknameRequest,
): Promise<RegisterResponse> => {
  const res: AxiosResponse<RegisterResponse> = await instance.post(
    `/api/member/nickname`,
    data,
  );
  return res.data;
};
