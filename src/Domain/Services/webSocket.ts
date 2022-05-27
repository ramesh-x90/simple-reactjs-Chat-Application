import { io } from "socket.io-client";

export function buildWebSocket(host: string) {
  interface event {
    type: "broadcast" | "private";
  }

  interface listener {
    event: event;
    function(msg: string): void;
  }

  let listeners: listener[] = [];

  return class WebSocket {
    socket = io(host, { withCredentials: true });
    static instence = new WebSocket();

    private constructor() {
      console.log("web socket created");
      this.incomingEvent({ type: "broadcast" });
    }

    broadcast(msg: string | object) {
      this.outGoingEvent(msg, { type: "broadcast" });
    }

    private incomingEvent(event: event) {
      this.socket.on(event.type, (msg) => {
        listeners.forEach((it) => {
          if (it.event.type == event.type) {
            it.function(msg);
          }
        });
      });
    }

    private outGoingEvent(data: any, event: event) {
      this.socket.emit(event.type, data);
    }

    addIncomingeventListner(event: event, callBack: (msg: any) => void) {
      if (!listeners.find((value) => value.event.type == event.type)) {
        listeners.push({ event: event, function: callBack });
      }
    }
  };
}
