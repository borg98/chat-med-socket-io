import "../Styles/createroom.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropup } from "./Dropup";

interface CreateRoomProps {
  roomName: string;
  setRoomName: (roomName: string) => void;
  roomDescription: string;
  setRoomDescription: (roomDescription: string) => void;
  createRoom: () => void;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}

export function CreateRoom(props: CreateRoomProps) {
  return (
    <>
      <div className="create-room-container">
        <>
          <Dropup
            roomName={props.roomName}
            setRoomName={props.setRoomName}
            roomDescription={props.roomDescription}
            setRoomDescription={props.setRoomDescription}
            createRoom={props.createRoom}
            setIsClicked={props.setIsClicked}
            isClicked={props.isClicked}
          />
        </>

        <button
          onClick={() => {
            props.setIsClicked(!props.isClicked);
          }}
          className="create-room-container__button"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="create-room-container__button__icon"
          />
        </button>
      </div>
    </>
  );
}
