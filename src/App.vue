<template>
  <div id="app">
    <Navbar :key="$route.fullPath" />
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
  width: 100%;

  --primary-color: #333;
  --secondary-color: rgb(165, 165, 170);
  --overlay-color: rgba(0, 0, 0, 0.5);
}
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
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