import { IUser } from "../models/IUser";
import "../Styles/displayusers.scss";
import { Avatar, AvatarGroup } from "@mui/material";

interface DisplayUsersProps {
  users?: IUser[];
}

export function DisplayUsers(props: DisplayUsersProps) {
  return (
    <>
      <div className="room-users-wrapper">
        <AvatarGroup max={2}>
          {props.users ? (
            props.users.map((user, i) => {
              if (user.active === true) {
                return (
                  <Avatar
                    key={i}
                    alt={user.username}
                    src={`https://placehold.co/150x150?text=${user.username
                      .slice(0, 1)
                      .toUpperCase()}`}
                  />
                );
              }
            })
          ) : (
            <p>No users</p>
          )}
        </AvatarGroup>
      </div>
    </>
  );
}
