<template>
  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono">
    <HeaderComponent />
    <ContentComponent />
    <!-- Add the ModalComponent to the template -->
    <ModalComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import ContentComponent from './components/OtherComponent.vue';
import ModalComponent from './components/ModalComponent.vue';
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Prevents scrolling outside the app container */
  background-color: #111518;
}
#app {
  height: 100%;
}

.container {
  display: flex;
  height: 100vh;
  font-family: 'IBM Plex Sans', Arial, sans-serif;
}

@media (max-width: 767px) {
  .html, body {
    overflow: auto;
  }
}
</style>