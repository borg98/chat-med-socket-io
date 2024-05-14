import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { IUser } from "./models/IUser";
import usersData from "./DB/Users.json";
import messagesData from "./DB/Messages.json";
import roomsData from "./DB/Rooms.json";
import { IMessage } from "./models/IMessage";
import { IRoom } from "./models/IRoom";

const PORT = 3000;
const app = express();

let users = usersData as IUser[];
let rooms = roomsData as IRoom[];

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World");
  req;
});

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("server-rooms-array", rooms);

  // klar
  socket.on("new-message", (message, roomid) => {
    console.log("new message", message);
    const onRoom = rooms.find((r) => r.id === roomid);
    onRoom?.messages.push(message);
    io.to(roomid).emit("get-messages", onRoom?.messages, onRoom?.users);
  });
  ////////

  // klar
  socket.on("log-in-check", (user) => {
    console.log("log in check", user);
    const foundUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );
    if (foundUser) {
      socket.emit("log-in-response", true, foundUser);
    } else {
      socket.emit("log-in-response", false);
    }
  });

  socket.on("sign-up", (user) => {
    const emailExist = users.find((u) => u.email === user.email);
    const userNameExist = users.find((u) => u.username === user.username);

    if (emailExist || userNameExist) {
      socket.emit("sign-up-response", false);
    } else {
      socket.emit("sign-up-response", true);
      users.push(user);
      console.log(users);
    }
  });
  ////////
  socket.on("notification", (userId: number, roomId: string) => {
    const userName = users.find((u) => u.id === userId)?.username;
    const roomName = rooms.find((r) => r.id === roomId)?.room_name;

    io.except(roomId).emit("notification-response", userName, roomName);
  });

  socket.on("get-users", (roomId: string, callback) => {
    const room = rooms.find((r) => r.id === roomId);
    callback(room?.users);
  });
  // socket.on("callback-rooms", (callback) => {
  //   callback(rooms);
  // });
  socket.on("new-room", (room) => {
    room.id = (rooms.length + 1).toString();
    //  if(room.isPrivate)
    //   rooms.private.push(room)
    //   else {
    //    rooms.public.push(room)
    //   }
    //   const userPrivate = rooms.private.filter((r) => r.users.find((u) => u.id === loggedInUser.id));
    //   const userRooms = {userPublic: rooms.public, userPrivate: userPrivate}
    rooms.push(room);
    io.emit("room-created", rooms);
  });

  // klar
  socket.on("join-room", (roomName, loggedInUser: IUser, callback) => {
    socket.rooms.forEach((socketRoom) => {
      // rooms.forEach((r) => {
      //   r.users.forEach((u) => {
      //     if (u.id === loggedInUser.id) {
      //       u.active = false;
      //       io.emit("user-left", r);
      //       console.log("User_leave", r);
      //     }
      //   });
      // });
      socket.leave(socketRoom);
    });

    const room = rooms.find((r) => r.id === roomName);
    if (room) {
      !room.users.find((u) => u.id === loggedInUser.id) &&
        room.users.push(loggedInUser);
      room.users.map((u) => {
        if (u.id === loggedInUser.id) {
          u.active = true;
        }
      });
      socket.join(roomName);
      io.to(roomName).emit("user-joined", room);
    }

    callback(room);
  });

  ///////////

  socket.on("remove-room", (roomName: string, callback) => {
    socket.rooms.forEach((room) => {
      console.log("Leaving room: ", room);

      socket.leave(room);
    });
    socket.join("1");
    callback("1");
    io.to(roomName).emit("leave-removed-room", "1");
    const room = rooms.find((r) => r.id === roomName);
    if (room) {
      const newRooms = rooms.filter((r) => r.id !== room.id);
      rooms = newRooms;
      io.emit("server-rooms-array", rooms);
    }
  });

  //klar
  socket.on("edit-message", (message: IMessage, roomId: string) => {
    const onRoom = rooms.find((r) => r.id === roomId);
    const index = onRoom?.messages.findIndex((m) => m.id === message.id);
    console.log(index);

    if (index !== undefined && index !== -1 && onRoom) {
      onRoom.messages[index] = message;
      console.log(onRoom.messages);

      io.to(roomId).emit("get-messages", onRoom?.messages, onRoom?.users);
    } else {
      console.log("no message found");
    }
  });
  ///////////////
  socket.on("logout", (loggedInUser: IUser) => {
    rooms.forEach((r) => {
      r.users.map((u) => {
        if (u.id === loggedInUser.id) {
          u.active = false;
          io.emit("user-left", r);
        }
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
