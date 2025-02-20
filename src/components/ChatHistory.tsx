import CustomButton from "./CustomButton";
import GetCall from "./getCall/GetCall";
import { IChatId } from "@/types/common";

interface IChatHistoryProps {
  chatHistory: IChatId[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatHistory = (props: IChatHistoryProps) => {
  const { chatHistory, activeChatId, onSelectChat } = props;

  return (
    <div className="w-1/4 bg-gray-200 p-4  overflow-y-auto flex flex-col justify-between  h-full fixed  ">
      <div>
        <h2 className="font-bold mb-8">Chat History</h2>
        {chatHistory.length > 0 ? (
          chatHistory.map((chat) => (
            <CustomButton
              key={chat.chatId}
              onPress={() => onSelectChat(chat.chatId)}
              className={`block w-full text-left p-2 rounded-md bg-gray-200 ${
                activeChatId === chat.chatId ? "bg-blue-500 text-white" : ""
              }`}
            >
              Chat {chat.chatId.slice(0, 8)}...
            </CustomButton>
          ))
        ) : (
          <p className="text-gray-600">No chats available.</p>
        )}
      </div>
      <GetCall />
    </div>
  );
};

export default ChatHistory;
