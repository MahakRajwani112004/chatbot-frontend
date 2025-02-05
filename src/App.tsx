import { Route, Routes } from "react-router-dom";
import Chatbot from "./pages/ChatBot";

function App() {
  return (
    <Routes>
      <Route element={<Chatbot />} path="/" />
    </Routes>
  );
}

export default App;
