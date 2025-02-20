export interface IApiResponseData<T> {
  success: boolean;
  errorMsg: string;
  response?: T | null;
}
export interface IChatId {
  chatId: string;
}
export interface IChatBotProps {
  text: string;
  sender: "user" | "bot";
}
export interface Chat {
  chatId: string;
  messages: IChatBotProps[];
}
export interface IDocument {
  documentPath: string;
  mimeType: string;
}
export interface ICreateChatRequestBody {
  message: string;
  chatId?: string;
  document?: IDocument;
}

export interface IUploadResponse {
  message: string;
  document: IDocument;
}

export interface IChatResponse {
  response: string;
  audio?: string;
  chatId: string;
}