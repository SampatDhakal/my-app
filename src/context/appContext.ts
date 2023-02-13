import React from "react";
import { io } from "socket.io-client";
import { SliceState } from "../features/userSlice";
const SOCKET_URL = process.env.REACT_APP_BASE_URL;
// const SOCKET_URL = "https://chat-app-backend-bwff.onrender.com";
export const socket = io(SOCKET_URL as string);

export type MessageType = {
  room: string;
  content: string;
  from: SliceState;
  time: string;
  date: string;
}

export type PrivateMemberMsgType = {
  id?: string;
  name: string;
  picture: string;
}

// Reusable type for all setState actions
type AppContextDispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

// Type definitions for app context
type AppContextType = {
  socket: typeof socket;
  currentRoom: string;
  setCurrentRoom: AppContextDispatchAction<string>;
  members: string[];
  setMembers: AppContextDispatchAction<string[]>;
  privateMemberMsg: PrivateMemberMsgType;
  setPrivateMemberMsg: AppContextDispatchAction<PrivateMemberMsgType>;
}

// app context
export const AppContext = React.createContext<AppContextType>({
  socket,
  currentRoom: "",
  setCurrentRoom: () => {},
  members: [],
  setMembers: () => {},
  privateMemberMsg: {
    name: "",
    picture: ""
  },
  setPrivateMemberMsg: () => {},
});
