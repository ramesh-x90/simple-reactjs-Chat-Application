import { getCookies } from "../Utility/cookie-parser";
import { LocalUserRepo } from "Data/Repository/LocaluserRepoIml";

interface UserCookie {
  name: string;
  expires_in: number;
  scope: string;
  id: number;
  email: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export function getLocalUserData(): UserCookie | undefined {
  const cookies = getCookies<UserCookie>();
  if (cookies) return cookies;
  return undefined;
}

export function getLocalUserName() {
  return LocalUserRepo.getUserName();
}

export function getLocalUserEmail() {
  return LocalUserRepo.getUserEmail();
}

export function getLocalUserPicture() {
  return LocalUserRepo.getUserPicture();
}
