import { IUser } from "../models/IUser";
import "../Styles/displayusers.scss";

interface DisplayOneUserProps {
  user: IUser;
}

export function DisplayOneUser(props: DisplayOneUserProps) {
  return (
    <div className="room-user-container">
      <img
        className="room-user-container__img"
        src={`https://placehold.co/150x150?text=${props.user.username
          .slice(0, 1)
          .toUpperCase()}`}
        alt={props.user.username}
      />
    </div>
  );
}
