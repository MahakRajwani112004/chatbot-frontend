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
  