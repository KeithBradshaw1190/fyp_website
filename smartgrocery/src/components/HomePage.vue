<template>
  <div id="homepage">
    <!--First Section(Features and Stores)-->
    <section class="features">
      <div class="container">
        <div>
          <h1>Smart Grocery Features</h1>
          <ul class="list-group">
            <li class="list-item">Get Notified when your groceries go out of date or when it's time to re order</li>
            <li class="list-item">Schedule a delivery or Pickup with via messenger</li>
            <li class="list-item">Ask for recipe suggestions based on your grocery list</li>
          </ul>

          <a href="#sign-up" class="btn">Sign Up</a>
        </div>
        <img src="../assets/onePlusPhone.png" alt />
      </div>
    </section>

    <!-- How It works & Retailers-->
    <section class="text-overlay">
      <div class="overlay">
        <div class="text-overlay-inner">
          <h3>How It Works</h3>
          <p>
            Create an account and link your Shopping account,
            add your grocery list and purchase frequency.
            You'll get a message when its time to order your groceries or when the items are about to go out of date.
            You can then Schedule a delivery or pickup all through the messenger interface!
          </p>
        </div>
      </div>
    </section>

    <!--Log in or Sign Up-->
    <section class="sign-up" id="sign-up">
      <SignUp />
    </section>
  </div>
</template>

<style scoped>
#homepage {
  font-family: "Catamaran", "sans-serif";
  line-height: 1.6;
  font-size: 1.1rem;
  color: #333;
  --primary-color: #333;
  --secondary-color: rgb(165, 165, 170);
  --overlay-color: rgba(0, 0, 0, 0.5);
}

h1,
h2,
h3,
h4 {
  line-height: 1.3;
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.5);
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

/* Features section */
.features {
  margin: 2rem 0;
}

.features .container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
  align-items: center;
  justify-content: center;
}

.features h1 {
  font-size: 4rem;
  color: var(--primary-color);
}
.signup h1 {
  font-size: 4rem;
  color: var(--primary-color);
}
.features p {
  margin: 1rem 0;
}

/* How it works section */
.text-overlay {
  position: relative;
  background: url("../assets/grocery-store.jpg") no-repeat bottom center/cover;
  height: 600px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--overlay-color);
}

.text-overlay-inner {
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 860;
  text-align: center;
  padding: 2.5rem 0;
}

.text-overlay-inner h2 {
  font-size: 5rem;
  margin-top: 0.5rem;
}

.text-overlay-inner h3 {
  font-size: 2rem;
}

.text-overlay-inner p {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 30px;
  margin-top: 0.2rem;
}

.btn:hover {
  background: var(--secondary-color);
}

/* Footer */
.footer-section {
  background: var(--primary-color);
  color: #fff;
  padding: 2rem;
}

.footer-section .container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.footer-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.footer-section a {
  line-height: 1.9;
  color: #ccc;
}

.footer-section a > i {
  margin-right: 0.5rem;
  color: #555;
}
</style>
<script>
import SignUp from "./SignUp";

export default {
  name: "homepage",
  components: {
    SignUp
  },
  data() {
    return {};
  }
};
</script>