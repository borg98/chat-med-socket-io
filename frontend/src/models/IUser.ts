import { IMessage } from "./IMessage";

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  messages: IMessage[];
}
