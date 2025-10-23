import { request } from "./request";

const chatService = {
  sendMessage: (messageData) =>
    request("POST", "/api/chat/message", messageData),
};

export default chatService;
