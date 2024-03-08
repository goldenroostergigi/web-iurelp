<template>
  <div v-if="isOpen" class="modal" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close" @click="closeModal">X</button>
      <p>Contact Us</p>
      <!-- Your contact form or content here -->
    </div>
  </div>
</template>

<script>
import { useModalStore } from "../store/modalStore"; // Adjust path as needed

export default {
  name: "ContactModal",
  computed: {
    isOpen() {
      const modalStore = useModalStore();
      return modalStore.isModalOpen('contact');
    },
  },
  methods: {
    closeModal() {
      const modalStore = useModalStore();
      modalStore.closeModal();
    },
  },
};
</script>

<style scoped>
/* Add your modal styling here */
</style>
