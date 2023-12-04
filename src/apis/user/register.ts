import { instance } from '@/apis';
import { AxiosResponse } from 'axios';
import { NicknameDuplicateResponse } from '@type/userType';

// 닉네임 중복 확인
export const checkDuplicatedNickname = async (
  data: string,
): Promise<NicknameDuplicateResponse> => {
  const res: AxiosResponse<NicknameDuplicateResponse> = await instance.get(
    `/api/member/nickname/${data}/exists`,
  );
  return res.data;
};

// 닉네임 설정 완료
