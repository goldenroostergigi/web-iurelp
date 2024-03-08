<template>
  <header class="header">
    <div class="brand-and-menu">
      <div class="brand-container">
        <span>Iurexa</span>
      </div>
      <nav v-show="!isMobile || menuOpen">
        <div class="menu-options">
          <a href="https://www.coanalyst.org">CoAnalyst</a>
          <a href="javascript:void(0)" @click="openModal">Contact</a> 
        </div>
      </nav>
    </div>
    <button @click="toggleMenu" class="menu-button" v-if="isMobile" aria-label="Toggle menu">☰</button>
  </header>
</template>

<script>
import { useModalStore } from '../store/ModalOpen';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      isMobile: false,
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    openModal() {
      const modalStore = useModalStore();
      modalStore.toggleModal();
    },
    updateWindowSize() {
      this.isMobile = window.innerWidth < 768;
    },
    debouncedUpdateWindowSize() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(this.updateWindowSize, 200);
    },
  },
  mounted() {
    this.updateWindowSize();
    window.addEventListener('resize', this.debouncedUpdateWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedUpdateWindowSize);
  },
}
</script>


  
  
  <style scoped>
  .header {
    background-color: #111518;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .brand-and-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .brand-container span {
    color: #C6C6C6;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.7em;
    padding-left: 2em;
    padding-right: 2em;
    font-weight: 800;
  }
  
  .menu-button {
    background: none;
    border: none;
    color: #C6C6C6;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-start; /* Align button to the start on mobile */
  }
  
  .menu-options a {
    text-decoration: none;
    margin: 0 10px; /* Spacing between links */
    text-align: center;
    color: #C6C6C6;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2em;
    padding-left: 2em;
    padding-right: 2em;
  }
  
  @media (max-width: 768px) {
    .header {
      flex-direction: row;
      justify-content: space-between;
    }
  
    .brand-and-menu {
      flex-direction: column;
    }
  
    .menu-options a {
      display: block; /* Stack links vertically in mobile */
      margin: 10px 0; /* Adjust spacing for vertical layout */
    }
  }
  </style>
  