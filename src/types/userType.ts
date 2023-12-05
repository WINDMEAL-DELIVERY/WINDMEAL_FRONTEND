export interface RegisterResponse {
  success: boolean;
  code: number;
  message: string;
  data: boolean;
}

export interface NicknameRequest {
  nickname: string;
}
