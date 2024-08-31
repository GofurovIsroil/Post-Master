<template>
  <div class="w-full">
    <table class="divide-y divide-gray-200 mx-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ID
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Body
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="post in posts" :key="post.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ post.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <p>{{ post.title }}</p>
          </td>
          <td class="px-6 py-4">
            <p>
              {{ post.body }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="text-center py-4">Loading...</div>
    <div class="flex justify-between mt-4">
      <button
        @click="fetchPosts(page - 1)"
        :disabled="page <= 1"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{ 'bg-gray-500': page <= 1 }"
      >
        Previous
      </button>
      <button
        @click="fetchPosts(page + 1)"
        :disabled="page >= 10"
        class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePostsStore } from "~/stores/posts";

const store = usePostsStore();
const posts = computed(() => store.posts);
const loading = computed(() => store.loading);
const page = computed(() => store.page);
const totalPages = computed(() => store.totalPages);

const fetchPosts = (page: number) => store.fetchPosts(page);

onMounted(() => fetchPosts(1));
</script>
