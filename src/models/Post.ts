export interface PostResponse {
  id: number;
  userId: number;      // Must exist here
  title: string;
  body: string;
}

export interface CommentResponse {
  id: number;
  postId: number;      // Must exist here
  name: string;
  email: string;
  body: string;
}