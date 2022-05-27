import { buildWebSocket } from "Domain/Services/webSocket";
import { API_SERVER_URI } from "appConfig";

export const WebSocketService = buildWebSocket(API_SERVER_URI).instence;
