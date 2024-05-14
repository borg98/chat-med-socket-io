import React from "react";
import "../Styles/dropup.scss";

interface DropupProps {
  roomName: string;
  setRoomName: (roomName: string) => void;
  roomDescription: string;
  setRoomDescription: (roomDescription: string) => void;
  createRoom: () => void;
  setIsClicked: (isClicked: boolean) => void;
  isClicked: boolean;
}

export const Dropup: React.FC<DropupProps> = (props) => {
  return (
    <div
      className={
        props.isClicked ? "dropup-container" : "dropup-container--closed"
      }
    >
      <div className="dropup-content">
        <input
          type="text"
          placeholder="Room Name"
          value={props.roomName}
          onChange={(e) => props.setRoomName(e.target.value)}
          className="dropup-content__input"
        />
        <input
          type="text"
          placeholder="Room Description"
          value={props.roomDescription}
          onChange={(e) => props.setRoomDescription(e.target.value)}
          className="dropup-content__input"
        />
        <div className="dropup-content__button-container">
          <button
            onClick={props.createRoom}
            className="dropup-content__button-container__button"
          >
            Create Room
          </button>
          <button
            onClick={() => {
              props.setIsClicked(false);
            }}
            className="dropup-content__button-container__button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
