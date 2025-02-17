import { useCallback, useEffect, useMemo, useState } from "react";
import { PencilIcon } from "@/assets/icon";
import useChatBotApis from "@/api/chatbot/useChatBotApis";
import { Chat, IChatBotProps, ICreateChatRequestBody } from "@/types/common";
import CustomButton from "@/components/CustomButton";
import CustomButtonIcon from "@/components/CustomButtonIcon";
import CustomMicroPhone from "@/components/CustomMicroPhone";
import CustomTextArea from "@/components/CustomTextArea";
import ChatHistory from "@/components/ChatHistory";

const Chatbot = () => {
  //Apis
  const { getAllChatHistory, createChat, getChatById } = useChatBotApis();

  //Local State
  const [messages, setMessages] = useState<IChatBotProps[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  // Effects
  const fetchChatHistory = useCallback(async () => {
    const { response, success } = await getAllChatHistory();
    if (!success || !response) return;
    const formattedData: Chat[] = response.map((chat: Chat) => ({
      chatId: chat.chatId,
      messages: chat.messages,
    }));
    setChatHistory(formattedData);
  }, []);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    setInput("");
    const userMessage: IChatBotProps = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    setListening(false);

    const requestBody: ICreateChatRequestBody = {
      message: input,
      chatId: chatId || undefined,
    };

    try {
      const { success, response } = await createChat(requestBody);
      if (!success || !response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Unable to get a response. Please try again later.",
            sender: "bot",
          },
        ]);
        setLoading(false);
        return;
      }

      const { response: botText, audio, chatId: newChatId } = response;
      if (!chatId && newChatId) {
        setChatId(newChatId);
      }

      const botMessage: IChatBotProps = { text: botText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      if (audio) {
        const audioElement = new Audio(audio);
        audioElement.play();
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "An unexpected error occurred. Please try again later.",
          sender: "bot",
        },
      ]);
    }
    setLoading(false);
  }, [input, chatId]);

  const renderMessageText = useMemo(
    () => (text: string) => {
      const parts = text.split(/(\*\*.*?\*\*)/);
      return (
        <span>
          {parts.map((part, index) =>
            /^\*\*(.*?)\*\*$/.test(part) ? (
              <strong key={index}>
                {part.replace(/^\*\*(.*?)\*\*$/, "$1")}
              </strong>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    },
    []
  );

  const handleSelection = useCallback(
    async (selectedChatId: string | null) => {
      if (!selectedChatId) return;

      const { success, response } = await getChatById(selectedChatId);
      if (!success || !response) return;
      setChatId(selectedChatId);
      setMessages(response);
    },
    [getChatById]
  );

  const MessageComponent = useMemo(() => {
    return messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-2 p-2 rounded-md ${
          msg.sender === "user"
            ? "bg-blue-100 text-right"
            : "bg-gray-100 text-left"
        }`}
      >
        <strong className="block text-sm text-gray-600">
          {msg.sender.toUpperCase()}
        </strong>
        {renderMessageText(msg.text)}
      </div>
    ));
  }, [messages, renderMessageText]);

  return (
    <div className="flex min-h-screen  shadow-lg ">
      <div className="w-1/4 bg-gray-100  overflow-y-auto hidden sm:block">
        <ChatHistory
          chatHistory={chatHistory}
          activeChatId={chatId}
          onSelectChat={handleSelection}
        />
      </div>
      <div className="w-full  sm:w-3/4 bg-white rounded-lg shadow-md p-4 ">
        <CustomButtonIcon
          children={<PencilIcon />}
          onPress={() => {
            setChatId(null);
            setMessages([]);
          }}
        />
        <h1 className="font-bold text-center">Have a chat with our Bot!</h1>
        <div className=" mb-4 border-b border-gray-200 p-4">
          {MessageComponent}
          {loading && (
            <div className="flex items-center text-gray-500">
              <span className="mr-2">Bot is typing</span>
              <div className="dots flex">
                <span className="dot animate-pulse mx-1 bg-gray-500 h-2 w-2 rounded-full"></span>
                <span className="dot animate-pulse mx-1 bg-gray-500 h-2 w-2 rounded-full"></span>
                <span className="dot animate-pulse mx-1 bg-gray-500 h-2 w-2 rounded-full"></span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CustomTextArea
            onChange={(e) => !listening && setInput(e.target.value)}
            value={input}
            className="flex-grow rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <CustomButton
            onPress={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            isDisabled={loading}
          >
            Send
          </CustomButton>
          <CustomMicroPhone
            onListeningChange={(isListening) => setListening(isListening)}
            onTranscript={(transcript) => {
              if (listening) {
                setInput(transcript);
              }
              if (!listening && transcript) {
                handleSend();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
