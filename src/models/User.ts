export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  // Remove userId and postId from IUser
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  // Remove userId and postId from Comment unless needed
}