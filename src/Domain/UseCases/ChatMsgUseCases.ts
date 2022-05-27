import { WebSocketService } from "Di/DiContainer";
import { LocalUserRepo } from "../../Data/Repository/LocaluserRepoIml";

interface sender {
  username: string;
  email?: string;
  picture?: string;
}

export interface message {
  sender: sender;
  data: any;
}

export let cache: message[] = [];

let listeners: { f(msgs: message[]): void }[] = [];

inComingBroadCastsListner();

export function sendMessageToAll(msg: any) {
  if (msg == "") return;
  WebSocketService.broadcast(msg);
  cache.push({
    sender: {
      username: LocalUserRepo.getUserName(),
      email: LocalUserRepo.getUserEmail(),
      picture: LocalUserRepo.getUserPicture(),
    },
    data: msg,
  });
  listeners.forEach((it) => it.f(cache));
}

export function inComingBroadCastsListner() {
  WebSocketService.addIncomingeventListner(
    { type: "broadcast" },
    (msg: {
      sender: { username: string; email: string; picture: string };
      message: any;
    }) => {
      cache.push({ sender: msg.sender, data: msg.message });
      listeners.forEach((it) => it.f(cache));
    }
  );
}

export function messagesListner(func: (msgs: message[]) => void): () => void {
  const fListener = listeners.find(
    (value) => func.toString() == value.f.toString()
  );
  if (fListener) {
    return () => (listeners = listeners.filter((it) => it.f != fListener.f));
  }
  listeners.push({ f: func });

  return () => {
    listeners = listeners.filter((it) => it.f != func);
  };
}
