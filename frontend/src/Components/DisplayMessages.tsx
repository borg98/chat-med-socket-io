import { IMessage } from "../models/IMessage";
import { IUser } from "../models/IUser";
import "../Styles/displayMessages.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Socket } from "socket.io-client";
import { useState } from "react";

interface DisplayMessagesProps {
  message: IMessage;
  user?: IUser;
  loggedInUser?: IUser;
  socket?: Socket;
  lastMessage?: boolean;
}

export function DisplayMessages(props: DisplayMessagesProps) {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState<IMessage>(props.message);

  const showEdit = props.user?.id === props.loggedInUser?.id;

  const elementClass =
    props.user?.id === props.loggedInUser?.id
      ? "user-message"
      : "other-message";

  const editMessage = () => {
    setEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, message: e.target.value });
  };

  const saveMessage = () => {
    props.socket?.emit("edit-message", message, message.room_id);
    setEditMode(false);
  };

  return (
    <>
      <div
        className={
          props.lastMessage
            ? `${elementClass} ${elementClass}__last-message`
            : elementClass
        }
      >
        <div className={`${elementClass}__icon`}>
          {props.user?.username.slice(0, 1).toUpperCase()}
        </div>
        <div className={`${elementClass}__content`}>
          <b className={`${elementClass}__content__username`}>
            {props.user?.username}
          </b>

          {editMode ? (
            <>
              <input
                type="text"
                className={`${elementClass}__content__edit-input`}
                onChange={handleChange}
              />
              <button
                className={`${elementClass}__content__edit-save`}
                onClick={saveMessage}
              >
                Save
              </button>
            </>
          ) : (
            <p className={`${elementClass}__content__message`}>
              {props.message.message}
            </p>
          )}
        </div>
        <div className={`${elementClass}__time-edit`}>
          {showEdit && (
            <button
              className={`${elementClass}__time-edit__edit`}
              onClick={editMessage}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
          <p className={`${elementClass}__time-edit__timestamp`}>
            {props.message.created_at}
          </p>
        </div>
      </div>
    </>
  );
}
