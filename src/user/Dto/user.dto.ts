// 定義Request輸入資料屬性
export interface UserDto {
  userId?: string;
  googleId?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  createdAt?: Date;
}
