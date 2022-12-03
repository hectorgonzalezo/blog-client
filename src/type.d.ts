interface IComment {
  content: string;
  published: boolean;
  commenter: string;
  post: string;
}

interface IPost {
  title: string;
  content: string;
  published: boolean;
  poster: string;
  comments: string[];
}

interface IUser {
  username: string;
  email: string;
  password: string;
  permission: "regular" | "admin";
}
