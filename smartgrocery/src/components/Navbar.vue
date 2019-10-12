<template>
  <nav class="navbar">
    <div class="container">
      <h3 class="logo" to="/">Smart Grocery</h3>
      <ul class="nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>

        <router-link class="btn" to="/signin">Sign In</router-link>
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

.navbar .container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
export default {
  name: "navbar",
  data() {
    return {};
  }
};
</script>