export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  published: boolean;
}
