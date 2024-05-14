import "../Styles/displayrooms.scss";

interface DisplaRoomsProps {
  room_name: string;
  room_id: string;
  setCurrentRoom: (id: string) => void;
  handleLeave: (id: string) => void;
  currentUserRole: string;
}

export function DisplayRooms(props: DisplaRoomsProps) {
  return (
    <>
      <div className="display-rooms-wrapper__container">
        <p className="display-rooms-wrapper__container__title">
          {props.room_name}
        </p>
        <div className="display-rooms-wrapper__container__button-container">
          <button
            onClick={() => {
              props.setCurrentRoom(props.room_id);
            }}
            className="display-rooms-wrapper__container__button-container__button"
          >
            Join
          </button>
          {props.currentUserRole === "admin" && props.room_id !== "1" && (
            <button
              onClick={() => props.handleLeave(props.room_id)}
              className="display-rooms-wrapper__container__button-container__button"
            >
              Remove room
            </button>
          )}
        </div>
      </div>
    </>
  );
}
