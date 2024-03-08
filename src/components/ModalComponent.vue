<template>
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
        <!-- Div for the close button, ensuring it's in its own row -->
        <div class="modal-header">
            <div>
                <button class="close-button" @click="closeModal">X</button>
            </div>
        </div>
        <!-- Div for the modal's content, in a separate row -->
        <div class="modal-body">
            <span>hello world</span>
        </div>
        </div>
    </div>
</template>
  
  
  <script>
  import { useModalStore } from '../store/ModalOpen';
  
  export default {
    name: 'ModalComponent',
    computed: {
      isModalOpen() {
        const modalStore = useModalStore();
        const isOpen = modalStore.isModalOpen;
        console.log('[ModalComponent] Computed isModalOpen accessed, value:', isOpen);
        return isOpen;
      },
    },
    methods: {
      closeModal() {
        const modalStore = useModalStore();
        modalStore.toggleModal();
        console.log('[ModalComponent] closeModal triggered');
      },
    },
    mounted() {
      console.log('[ModalComponent] mounted, initial isModalOpen:', this.isModalOpen);
    },
  }
  </script>
  
  
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* High enough to overlay other content */
}

.modal-content {
  background-color: #D9D9D9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column; /* Organize children (header and body) in a column */
  max-width: 500px;
  position: relative;
  overflow-y: auto;
  height: auto;
  padding: 1.5em;
  font-family: 'IBM Plex Sans', Arial, sans-serif;
  width: 25em;
  font-size: 1em;
}

.modal-header {
  display: flex;
  justify-content: flex-end; /* Align the close button to the right */
  padding-bottom: 10px; /* Optional: Adds some space between the header and body */
  height: auto;
  padding: 1em;
}

.modal-body {
  /* Now explicitly takes up its own row. Adjust padding as needed */
  flex-grow: 1;
}

.modal-body {
/* Styles for the modal body if needed, e.g., padding, overflow */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 20px; /* Make the button larger */
}


@media (max-width: 600px) {
.modal-content {
    padding: 15px;
    max-width: 90%; /* Take more screen space on smaller devices */
    width: 12em;
    font-size: .7em;
}

.close-button {
    font-size: .9em;
}

}
</style>

  