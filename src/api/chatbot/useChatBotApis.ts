import { useCallback } from "react";
import { useHttpMethodContext } from "@/context/HttpContextProvider";
import {
  Chat,
  ICreateChatRequestBody,
  IApiResponseData,
  IChatResponse,
  IChatBotProps,
} from "@/types/common";

const useChatBotApis = () => {
  const { get, post } = useHttpMethodContext();

  const getAllChatHistory = useCallback(async (): Promise<
    IApiResponseData<Chat[]>
  > => {
    const response = await get<Chat[]>("/api/chats");
    return response;
  }, [get]);

  const createChat = useCallback(
    async (
      requestBody: ICreateChatRequestBody
    ): Promise<IApiResponseData<IChatResponse>> => {
      const response = await post<IChatResponse>("/api/generate", requestBody);
      return response;
    },
    [post]
  );

  const getChatById = useCallback(
    async (id: string | null): Promise<IApiResponseData<IChatBotProps[]>> => {
      const response = await get<IChatBotProps[]>(`/api/chats/${id}`);
      return response;
    },
    [get]
  );

  return { getAllChatHistory, createChat, getChatById };
};
export default useChatBotApis;
