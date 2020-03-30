<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0 logo">Smart Grocery</a>

      <h3 class="logo"></h3>
      <ul class="nav right">
        <li v-if="isLoggedIn">
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/grocery-dashboard">Dashboard</router-link>
        </li>
        <!-- <li v-if="!isLoggedIn">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Sign Up</router-link>
        </li>-->
        <li v-if="isLoggedIn">
          <button class="btn btn-outline-primary" @click="logout">Log Out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
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
</style>

<script>
import firebaseApp from "../firebaseInit";
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
    if (firebaseApp.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebaseApp.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      sessionStorage.clear();
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          router.go({ name: "homepage" });
        });
    }
  }
};
</script>