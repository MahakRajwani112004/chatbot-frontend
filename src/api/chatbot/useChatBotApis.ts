import { useHttpMethodContext } from "@/context/HttpContextProvider";
import { Chat, IApiResponseData } from "@/types/common";
import { useCallback } from "react";

const useChatBotApis = () => {
  const { get } = useHttpMethodContext();

  const getAllChatHistory = useCallback(async (): Promise<
    IApiResponseData<Chat[]>
  > => {
    const response = await get<Chat[]>("/api/chats");
    return response;
  }, [get]);
  return { getAllChatHistory };
};
export default useChatBotApis;
