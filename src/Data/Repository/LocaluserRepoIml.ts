import { LocalUser } from "Data/DataSource/LocalUser";

export const LocalUserRepo = {
  getUserName: () => LocalUser().name,
  getUserEmail: () => LocalUser().email,
  getUserPicture: () => LocalUser().picture,
  getAllData: () => LocalUser(),
};
