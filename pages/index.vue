<template>
  <div class="container">
    <button
      @click="showModal = true"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Create Post
    </button>
    <PostTable />
    <Modal :show="showModal" @update:show="showModal = $event" />
  </div>
</template>

<script setup lang="ts">
import PostTable from "../components/PostsTable.vue";
import Modal from "../components/Modal.vue";
import { ref } from "vue";

const showModal = ref(false);
</script>
