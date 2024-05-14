import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IRoom {
  id: string;
  room_name: string;
  users: IUser[];
  messages: IMessage[];
}
