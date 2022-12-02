interface IComment {
  content: string;
  published: boolean;
  commenter: ObjectId;
  post: ObjectId;
}

interface IPost {
  title: string;
  content: string;
  published: boolean;
  poster: ObjectId;
  comments: ObjectId[];
}

interface IUser {
  username: string;
  email: string;
  password: string;
  permission: "regular" | "admin";
}
