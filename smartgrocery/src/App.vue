<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Catamaran", "sans-serif";
  line-height: 1.6;
  font-size: 1.1rem;
  color: #333;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  --primary-color: #333;
  --secondary-color: rgb(165, 165, 170);
  --overlay-color: rgba(0, 0, 0, 0.5);
}
</style>

<script>

import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>