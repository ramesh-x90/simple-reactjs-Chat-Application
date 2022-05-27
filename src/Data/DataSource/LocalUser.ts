import { parse } from "cookie";

export function LocalUser() {
  return parse(document.cookie);
}
