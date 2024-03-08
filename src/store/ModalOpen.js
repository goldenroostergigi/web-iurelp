// store/modalStore.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      console.log('toggleModal called. New isModalOpen state:', this.isModalOpen);
    },
  },
});

