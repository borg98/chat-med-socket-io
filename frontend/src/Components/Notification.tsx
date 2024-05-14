import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Socket } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

interface NotificationProps {
  socket?: Socket;
  roomId: string;
  roomname: string;
}
export const Notification = (props: NotificationProps) => {
  useEffect(() => {
    if (props.socket) {
      props.socket.on(
        "notification-response",
        (userName: string, roomName: string) => {
          toast(`${userName} sent a new message in ${roomName}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            style: {
              background: "black",
              color: "white",
            },
          });
        }
      );
    }
  }, [props.socket]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
