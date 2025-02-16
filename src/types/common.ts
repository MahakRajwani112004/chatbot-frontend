export interface IApiResponseData<T> {
  success: boolean;
  errorMsg: string;
  response?: T | null;
}
export interface IChatId {
  chatId: string;
}

export interface Message {
  user: string;
  bot: string;
}

export interface Chat {
  chatId: string;
  messages: Message[];
}
export interface ICreateChatRequestBody {
  message: string;
  chatId?: string;
}

export interface IChatResponse {
  response: string;
  audio?: string;
  chatId: string;
}
export interface IChatBotProps {
  text: string;
  sender: "user" | "bot";
}