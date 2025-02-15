import { Route, Routes } from "react-router-dom";
import Chatbot from "./module/chatbot/pages/ChatBot";
import { HttpContextProvider } from "./context/HttpContextProvider";

function App() {
  return (
    <HttpContextProvider>
      <Routes>
        <Route element={<Chatbot />} path="/" />
      </Routes>
    </HttpContextProvider>
  );
}

export default App;
