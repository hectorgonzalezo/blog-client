interface IComment {
  content: string;
  published: boolean;
  commenter: IUser;
  post: string;
  createdAt: string;
  _id: string;
}

interface IPost {
  title: string;
  content: string;
  published: boolean;
  poster: string;
  comments: IComment[];
  createdAt: string;
  _id: string;
}

interface IUser {
  username: string;
  email: string;
  password?: string;
  permission: "regular" | "admin";
}

interface UserState {
  user: IUser | null;
}

interface UserAction {
  type: string; 
  user: IUser | null;
}

type DispatchUser = (args: UserAction) => UserAction;

declare module "*.jpg";
declare module "*.png";
declare module "*.gif";