import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IRoom } from "../models/IRoom";
import io, { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";
import { GlobalChat } from "./GlobalChat";
import { CreateRoom } from "./CreateRoom";
import { DisplayRooms } from "./DisplayRooms";
import "../Styles/chatroom.scss";

const Chatrooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [socket, setSocket] = useState<Socket>();
  const [currentRoom, setCurrentRoom] = useState("1");
  const [createRoomClicked, setCreateRoomClicked] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);

  const Loggedinuser = JSON.parse(
    localStorage.getItem("Loggedinuser") || "{}"
  ) as IUser;
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    socket.on("server-rooms-array", (rooms: IRoom[]) => {
      setRooms(rooms);
    });
    socket.on("room-created", (rooms: IRoom[]) => {
      setRooms(rooms);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLeave = (id: string) => {
    socket?.emit("remove-room", id, (roomId: string) => {
      setCurrentRoom(roomId);
    });
  };
  const logout = () => {
    socket?.emit("logout", Loggedinuser);
    localStorage.removeItem("Loggedinuser");
    navigate("/");
    socket?.disconnect();
  };

  const createRoom = () => {
    const room: IRoom = {
      id: (rooms.length + 1).toString(),
      room_name: roomName,
      users: [Loggedinuser],
      messages: [],
    };
    socket && socket.emit("new-room", room);
    setCreateRoomClicked(false);
  };

  return (
    <>
      <section className="chatroom-wrapper">
        <div className="chatroom-wrapper__container">
          <h3 className="chatroom-wrapper__container__title">CHATROOM</h3>
        </div>
        <p className="chatroom-wrapper__current-user">
          Logged in as: <br></br>
          {Loggedinuser.username}
        </p>
        <button className="chatroom-wrapper__logout" onClick={logout}>
          Logout
        </button>
        <GlobalChat
          roomId={currentRoom}
          roomname={rooms.find((r) => r.id === currentRoom)?.room_name || ""}
          loggedInUser={Loggedinuser}
          socket={socket}
          setRoomId={setCurrentRoom}
          onlineUsers={onlineUsers}
          setOnlineUsers={setOnlineUsers}
        />
        <CreateRoom
          isClicked={createRoomClicked}
          setIsClicked={setCreateRoomClicked}
          roomName={roomName}
          setRoomName={setRoomName}
          roomDescription={roomDescription}
          setRoomDescription={setRoomDescription}
          createRoom={createRoom}
        />

        <div className="display-rooms-wrapper">
          {rooms.map((room, i) => {
            return (
              <DisplayRooms
                key={i}
                room_id={room.id}
                room_name={room.room_name}
                setCurrentRoom={setCurrentRoom}
                handleLeave={handleLeave}
                currentUserRole={Loggedinuser.role}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Chatrooms;
