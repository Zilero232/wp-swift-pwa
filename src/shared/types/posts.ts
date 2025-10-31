export interface WordPressPost {
  id: number;
  title: string;
  link: string;
  type: string;
  status: string;
}

export interface PostsResponse {
  posts: WordPressPost[];
  total: number;
  pages: number;
  has_more: boolean;
}
