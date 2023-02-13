import "./App.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import { AppContext, socket } from "./context/appContext";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SliceState } from "./features/userSlice";


function App() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState<{}>({});
  const [newMessages, setNewMessages] = useState<{}>({});
  const user = useSelector((state: SliceState) => state);
  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      {" "}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
            </>
          )}
          <Route
            path="/chat"
            element={<Chat />}
          />
        </Routes>
      </BrowserRouter>{" "}
    </AppContext.Provider>
  );
}

export default App;
