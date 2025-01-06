import "./App.css";
import { Chat } from "./pages/Chat";
import { Layout } from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";


function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
