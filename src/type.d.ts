interface IComment {
  content: string;
  published: boolean;
  commenter: IUser | string;
  post: string;
  createdAt?: string;
  _id?: string;
}

interface IPost {
  title: string;
  content: string;
  published: boolean;
  poster: IUser | string;
  comments: IComment[];
  createdAt?: string;
  _id?: string;
}

interface IUser {
  username: string;
  password?: string;
  permission: "regular" | "admin";
  token?: string;
  _id?: string;
}

interface UserState { user: IUser | null }

interface UserAction {
  type: string; 
  user: IUser | null;
}

type DispatchUser = (args: UserAction) => UserAction;


interface SignUpError {
  location: string;
  msg: string;
  param: string;
  value: string;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.gif";