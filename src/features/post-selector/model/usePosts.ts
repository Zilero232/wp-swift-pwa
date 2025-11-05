import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';

import { postsAPI } from '@/services/posts.service';

export function usePosts(searchQuery: MaybeRefOrGetter<string>) {
  const queryKey = computed(() => {
    return [`posts${toValue(searchQuery) ? `-${toValue(searchQuery)}` : ''}`];
  });

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: queryKey.value,
      queryFn: async ({ pageParam = 1 }) => {
        return await postsAPI.getPosts({
          page: pageParam,
          per_page: 20,
          search: toValue(searchQuery),
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.data.has_more ? lastPage.data.posts.length / 20 + 1 : undefined;
      },
      initialPageParam: 1,
    });

  // Flatten all pages into a single array
  const posts = computed(() => {
    return data.value?.pages.flatMap((page) => page.data.posts) ?? [];
  });

  const postOptions = computed(() => [
    { label: 'Главная страница (/)', value: '/' },
    ...posts.value.map(({ title, type, link }) => ({
      label: `${title} (${type})`,
      value: link,
    })),
  ]);

  const loadMore = async () => {
    if (hasNextPage.value && !isLoading.value && !isFetchingNextPage.value) {
      await fetchNextPage();
    }
  };

  return {
    posts,
    postOptions,
    isLoading: computed(() => isLoading.value || isFetchingNextPage.value),
    hasMore: hasNextPage,
    loadPosts: refetch,
    loadMore,
  };
}
