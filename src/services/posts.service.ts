import apiClient from '@/shared/api/client';

import type {
 APIResponse 
} from '@/shared/types';
import type {
 PostsResponse 
} from '@/shared/types/posts';

interface GetPostsParams {
  page?: number;
  per_page?: number;
  search?: string;
  post_type?: string;
}

class PostsAPI {
  async getPosts(params?: GetPostsParams) {
    const {
      page = 1,
      per_page = 10,
      search = '',
      post_type = 'post,page',
    } = params || {};

    const {
 data 
} = await apiClient.get<APIResponse<PostsResponse>>('/posts', {
      params: {
        page,
        per_page,
        search,
        post_type,
      },
    });

    return data;
  }
}

export const postsAPI = new PostsAPI();
