import { Socket } from "socket.io-client";
import { IMessage } from "../models/IMessage";
import { IUser } from "../models/IUser";
import { DisplayMessages } from "./DisplayMessages";
import { useEffect, useRef, useState } from "react";

import "../Styles/globalchat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { IRoom } from "../models/IRoom";

import "react-toastify/dist/ReactToastify.css";
import { DisplayUsers } from "./DisplayUsers";
import { Notification } from "./Notification";

interface GlobalChatProps {
  socket?: Socket;
  roomId: string;
  roomname: string;
  loggedInUser?: IUser;
  setRoomId: (room: string) => void;
  onlineUsers: IUser[];
  setOnlineUsers: (users: IUser[]) => void;
}

export function GlobalChat(props: GlobalChatProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const scrollref = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState<IRoom>();

  useEffect(() => {
    if (props.socket) {
      props.socket.emit(
        "join-room",
        props.roomId,
        props.loggedInUser,
        (serverRoom: IRoom) => {
          if (serverRoom) {
            setRoom(serverRoom);
            setUsers(serverRoom.users);
            setMessages(serverRoom.messages);
          } else {
            console.log("no room found");
          }
        }
      );
      props.socket.on("get-messages", (messages: IMessage[], user: IUser[]) => {
        setUsers(user);
        setMessages(messages);
      });

      props.socket.on("leave-removed-room", (roomId: string) => {
        props.setRoomId(roomId);
      });

      props.socket.on("user-joined", (room: IRoom) => {
        if (room.id === props.roomId) {
          setRoom(room);
          setUsers(room.users);
          props.setOnlineUsers(room.users);
        }
      });
    }
  }, [props.socket, props.roomId]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("edited-message", (message: IMessage) => {
        const index = messages.findIndex((m) => m.id === message.id);
        if (index !== -1) {
          const updatedMessages = [...messages];
          updatedMessages[index] = message;

          setMessages(updatedMessages);
        }
      });
    }
  }, [props.socket, messages]);

  useEffect(() => {
    if (scrollref.current) {
      scrollref.current.scrollTop = scrollref.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const input = document.querySelector(
      ".global-chat__input-container__input"
    ) as HTMLInputElement;

    if (input.value) {
      const message: IMessage = {
        id: messages.length,
        user_id: props.loggedInUser?.id || 0,
        room_id: props.roomId,

        created_at: new Date().toUTCString().slice(0, 25),
        updated_at: new Date().toUTCString().slice(0, 25),
        message: input.value,
      };
      if (props.socket) {
        props.socket.emit("new-message", message, room?.id);
        props.socket.emit("notification", message.user_id, room?.id);
        console.log("new message", message);
      }
      input.value = "";
    }
  };

  if (0) {
    console.log("hejsvejs");
  }

  console.log("users", users);

  return (
    <>
      <Notification socket={props.socket} roomId="" roomname="" />

      <div className="global-chat-container">
        <div className="global-chat-container__roomname">
          <p className="global-chat-container__roomname__p">
            {room?.room_name}
          </p>
          <DisplayUsers users={props.onlineUsers} />
        </div>
        <div className="global-chat">
          <div className="global-chat__messages-container">
            <div
              className="global-chat__messages-container__messages"
              ref={scrollref}
            >
              {messages.map((message, i) => {
                const user = users.find((u) => u.id === message.user_id);

                return (
                  <DisplayMessages
                    lastMessage={messages[messages.length - 1] === message}
                    key={i}
                    message={message}
                    user={user}
                    loggedInUser={props.loggedInUser}
                    socket={props.socket}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <form
              className="global-chat__input-container"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault(), sendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Type a message"
                className="global-chat__input-container__input"
              />
              <button className="global-chat__input-container__button">
                <FontAwesomeIcon icon={faBeerMugEmpty} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
