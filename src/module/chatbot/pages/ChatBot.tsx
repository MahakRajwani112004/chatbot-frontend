import { useCallback, useEffect, useMemo, useState } from "react";
import AxiosService from "@/services/AxiosService";
import CustomButton from "@/components/CustomButton";
import MicroPhone from "@/components/CustomMicroPhone";
import ChatHistory from "@/components/ChatHistory";
import CustomButtonIcon from "@/components/CustomButtonIcon";
import {PencilIcon } from "@/assets/icon";
import CustomTextArea from "@/components/CustomTextArea";
import useChatBotApis from "@/api/chatbot/useChatBotApis";
import { Chat } from "@/types/common";

interface IChatBotProps {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  //Apis
  const { getAllChatHistory } = useChatBotApis();

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: IChatBotProps = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);
    setInput("");
    setListening(false);

    //TODO need to change this , call api from api's folder
    try {
      const { data } = await AxiosService.post<{
        response: string;
        audio: string;
        chatId: string;
      }>("/generate", {
        message: input,
        chatId: chatId,
      });

      if (!chatId) {
        setChatId(data.chatId);
      }

      const botMessage: IChatBotProps = { text: data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.play();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: IChatBotProps = {
        text: "Sorry, something went wrong.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      <span>
        {parts.map((part, index) =>
          /^\*\*(.*?)\*\*$/.test(part) ? (
            <strong key={index}>{part.replace(/^\*\*(.*?)\*\*$/, "$1")}</strong>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleChatSelection = async (selectedChatId: string | null) => {
    setChatId(selectedChatId);
    //TODO need to change this api calling from api folder
    try {
      const { data } = await AxiosService.get(`/chats/${selectedChatId}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

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
    <div className="flex min-h-screen bg-whitesmoke  shadow-lg">
      <div className="w-1/4 bg-gray-100  overflow-y-auto">
        <ChatHistory
          chatHistory={chatHistory}
          activeChatId={chatId}
          onSelectChat={handleChatSelection}
        />
      </div>
      <div className="w-3/4 bg-white rounded-lg shadow-md p-4">
        <CustomButtonIcon
          children={<PencilIcon />}
          onPress={() => {
            setMessages([]);
          }}
        />
        <h1 className="font-bold text-center">Have a chat with our Bot!</h1>
        <div className="overflow-y-auto mb-4 border-b border-gray-200 p-4">
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <CustomButton
            onPress={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            isDisabled={loading}
          >
            Send
          </CustomButton>
          <MicroPhone
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
