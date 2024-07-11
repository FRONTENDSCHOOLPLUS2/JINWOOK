interface IResponse {
  ok: number;
}

interface Post {
  _id: number;
  type: string;
  name: string;
  user: User;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  seller_id?: number;
  views: number;
}

interface PostContent extends Omit<Post, "name"> {}

export interface PostHandle extends IResponse {
  item: PostContent;
}

interface PostContent extends Post {
  replies: Reply[];
}

export interface PostDetail extends IResponse {
  item: PostContent;
}

interface PostItem extends Post {
  repliesCount: number;
  tag: string;
}

export interface PostList extends IResponse {
  item: PostItem[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}

export interface Replies extends IResponse {
  item: Reply[];
}

interface Reply {
  _id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  _id: number;
  profile?:
    | string
    | {
        [imgParam: string]: string;
      };
  name: string;
}

export interface UserState {
  _id: number;
  name: string;
  email: string;
  profileImage: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ErrorType {
  location: string;
  msg: string;
  path: "email" | "password";
  type: "field";
  value: string;
}
