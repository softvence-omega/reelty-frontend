/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";

export interface AiRequestPayload {
  auth_token: string;
  url: string;
  videoType: number;
  langCode: string;
  clipLength: number;
  maxClipNumber: number;
  templateId: string;
  prompt?: string;
}

export interface AiResponse {
  error?: boolean;
  message?: string;
  data?: any;
}

// Option 1: Basic connection (try this first)
// export const socket: Socket = io("http://184.105.3.172:8000", {
//   transports: ["websocket", "polling"],
//   autoConnect: false, // Start with false, we'll connect manually
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
//   timeout: 10000,
// });

// Option 2: If above doesn't work, try with specific path
// export const socket: Socket = io("http://184.105.3.172:8000", {
//   path: "/socket.io/",
//   transports: ["websocket", "polling"],
//   autoConnect: false,
// });

// Option 3: If still not working, try with forceNew connection
export const socket: Socket = io("http://184.105.3.172:8000", {
  forceNew: true,
  transports: ["websocket", "polling"],
  autoConnect: false,
});