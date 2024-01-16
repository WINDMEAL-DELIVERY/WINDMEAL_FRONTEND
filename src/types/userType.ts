export interface RegisterResponse {
  success: boolean;
  code: number;
  message: string;
  data: boolean;
}

export interface NicknameRequest {
  nickname: string;
}

export interface FCMTokenRequest {
  alarmToken: string;
}

export interface FCMTokenResponse {
  success: true;
  code: number;
  message: string;
  data: {
    id: number;
    email: string;
    nickname: string;
  };
}
