import { MicroPhoneIcon } from "@/assets/icon";
import CustomButtonIcon from "@/components/CustomButtonIcon";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface IMicProps {
  onTranscript: (transcript: string) => void;
  onListeningChange: (listening: boolean) => void;
}

const MicroPhone = (props: IMicProps) => {
  const { onTranscript, onListeningChange } = props;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ language: "en-IN" });
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 15000);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  useEffect(() => {
    onListeningChange(listening);
  }, [listening, onListeningChange]);
  useEffect(() => {
    onTranscript(transcript);
    if (!listening) {
      resetTranscript(); // Fix by actually calling the function
    }
  }, [transcript, onTranscript]);

  return (
    <div className="flex gap-4">
      <CustomButtonIcon
        onPress={handleStartListening}
        className={`p-2 rounded-lg transition-all duration-200 
        ${listening ? "bg-green-500 border-green-600" : "bg-gray-200 border-gray-300"} `}
      >
        <MicroPhoneIcon />
      </CustomButtonIcon>
      {listening && (
        <div className="flex gap-4">
          <button onClick={handleStopListening}>Stop</button>
          <button onClick={handleResetTranscript}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default MicroPhone;
