import { useMemo, useState } from "react";
import AxiosService from "@/services/AxiosService";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import MicroPhone from "@/components/CustomMicroPhone";

interface IChatBotProps {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<IChatBotProps[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: IChatBotProps = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);
    setInput("");
    setListening(false);

    try {
      const { data } = await AxiosService.post<{
        response: string;
        audio: string;
      }>("/generate", {
        message: input,
      });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-whitesmoke p-4 shadow-lg">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
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
          <CustomInput
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
