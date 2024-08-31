import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as any[],
    loading: false,
    error: null as string | null,
    page: 1,
    totalPages: 0,
  }),
  actions: {
    async fetchPosts(page: number) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        this.posts = response.data;
        this.page = page;
        const totalPosts = parseInt(response.headers["x-total-count"], 10);
        this.totalPages = Math.ceil(totalPosts / 10);
      } catch (error) {
        this.error = "Failed to fetch posts";
      } finally {
        this.loading = false;
      }
    },
    async createPost(post: any) {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          post
        );
        console.log("Post created:", response.data);
        this.posts.push(response.data);
      } catch (error) {
        this.error = "Failed to create post";
      }
    },
  },
});
