import { FCMTokenRequest, FCMTokenResponse } from '@type/userType';
import { AxiosResponse } from 'axios';
import { instance } from '@/apis';

// FCM 토큰 전송
export const setUserFCMToken = async (
  data: FCMTokenRequest,
): Promise<FCMTokenResponse> => {
  const res: AxiosResponse<FCMTokenResponse> = await instance.post(
    `/api/member/info`,
    data,
  );
  return res.data;
};
