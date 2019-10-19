<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0 logo">Smart Grocery</a>

      <h3 class="logo"></h3>
      <ul class="nav right">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/grocery-dashboard">Dashboard</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="isLoggedIn">
          <button class="btn" @click="logout">Log Out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style >
h1,
h2,
h3,
h4 {
  line-height: 1.3;
}

a {
  color: var(--secondary-color);
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  width: 100%;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
}

.navbar {
  font-size: 1.2rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.navbar .logo {
  font-size: 2rem;
}

.navbar .nav {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar .nav a {
  padding: 0 1rem;
}

.navbar .nav a:hover {
  color: #555;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 50px;
}

.btn:hover {
  background: var(--secondary-color);
}
</style>

<script>
import { fb } from "../firebaseInit";
import router from "../router";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (fb.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = fb.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      fb.auth()
        .signOut()
        .then(() => {
          router.go({ name: "homepage" });
        });
    }
  }
};
</script>