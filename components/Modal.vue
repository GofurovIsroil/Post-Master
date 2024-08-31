<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-lg font-bold mb-4">Create Post</h2>
      <form @submit.prevent="createPost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title</label
          >
          <input
            id="title"
            v-model="post.title"
            type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="body" class="block text-sm font-medium text-gray-700"
            >Body</label
          >
          <textarea
            id="body"
            v-model="post.body"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          ></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button
          @click="cancel"
          type="button"
          class="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePostsStore } from "~/stores/posts";

const props = defineProps<{ show: boolean }>();
const emit = defineEmits<{ (e: "update:show", value: boolean): void }>();

const store = usePostsStore();
const post = ref({ title: "", body: "" });

const createPost = async () => {
  console.log("Creating post:", post.value);
  await store.createPost(post.value);
  emit("update:show", false);
  post.value.body = "";
  post.value.title = "";
};

const cancel = () => {
  emit("update:show", false);
  post.value.body = "";
  post.value.title = "";
};
</script>
