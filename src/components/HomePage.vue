<template>
  <div id="homepage">
    <section class="features">
      <div class="container">
        <div>
          <h1>Smart Grocery</h1>
          <ul class="list-group">
            <li
              class="list-item"
            >The Chatbot to save you time and make grocery shopping much easier.</li>
          </ul>
          <div class="row">
            <a href="#features" class="btn-site-primary text-center mr-3">View All Features</a>
            <SignIn v-if="!isLoggedIn" />
          </div>
        </div>
        <img src="../assets/onePlusPhone.png" alt />
      </div>
    </section>

    <!-- How It works Steps-->
    <section class="text-overlay">
      <div class="overlay">
        <div class="text-overlay-inner">
          <h3>How It Works</h3>
          <div class="row pt-5 m-2">
            <div
              class="col-lg-4 mb-5 mb-lg-0 card rounded-left bg-light pt-3 border-0"
              style="border-radius:0; background-color:#181d20c2!important"
            >
              <i class="fas fa-clipboard-list fa-3x mb-3"></i>
              <h5>Create A Grocery List</h5>
              <p
                class="px-lg-3 mb-0"
              >Create as many shopping lists as needed. Use the inbuilt grocery search for convenience</p>
            </div>
            <div
              class="col-lg-4 col-md-12 mb-5 mb-lg-0 card bg-light pt-3 border-0"
              style="border-radius:0; background-color:#181d20c2!important"
            >
              <i class="fas fa-store-alt fa-3x mb-3"></i>
              <h5>Link Your Local Supermarket Account</h5>
              <p
                class="px-lg-3 mb-0"
              >Link your account with your local supermarket to enable delivery and collection services</p>
            </div>
            <div
              class="col-lg-4 col-md-12 card rounded-right bg-light pt-3 border-0"
              style="border-radius:0; background-color:#181d20c2!important"
            >
              <i class="fas fa-comments fa-3x mb-3"></i>
              <h5>Message The Bot</h5>
              <p class="px-lg-3 mb-0">Interact with the bot through Facebook Messenger</p>
              <a href="#features" class="stretched-link">View features</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Chatbot Feature Section-->
    <section class="feature-section" id="features">
      <!-- Section heading -->
      <h2 class="font-weight-bold text-center my-5">ChatBot Features</h2>
      <!-- Section description -->
      <p class="lead grey-text text-center w-responsive mx-auto mb-5">
        The goal of the ChatBot is to help a user save time time when it comes to grocery shopping.
        <br />
      </p>

      <!-- Grid row -->
      <div class="row">
        <!-- Messenger Icon-->
        <div class="col-lg-5 text-center text-lg-left">
          <img
            class="img-fluid"
            src="https://i.ya-webdesign.com/images/facebook-messenger-png-1.png"
          />
        </div>
        <!--Messenger Icon -->

        <!-- Text Columns -->
        <div class="col-lg-7">
          <div class="row mb-3">
            <!--Icon -->
            <div class="col-1">
              <i class="fas fa-share fa-lg"></i>
            </div>

            <!-- Delivery Feature -->
            <div class="col-xl-10 col-md-11 col-10">
              <h5 class="font-weight-bold mb-3">Delivery</h5>
              <p>Send a Message asking to schedule a grocery delivery with the name of the list you want, the time and date that suits you.</p>
            </div>
          </div>

          <div class="row mb-3">
            <!-- Icon -->
            <div class="col-1">
              <i class="fas fa-share fa-lg"></i>
            </div>
            <!-- Collection Feature -->
            <div class="col-xl-10 col-md-11 col-10">
              <h5 class="font-weight-bold mb-3">Collection / PickUp</h5>
              <p>Send a Message asking to schedule a grocery Pickup from your local store with the name of the list you want, the time and date that suits you.</p>
            </div>
          </div>

          <div class="row">
            <!-- Icon -->
            <div class="col-1">
              <i class="fas fa-share fa-lg"></i>
            </div>
            <!-- Recipe Feauture -->
            <div class="col-xl-10 col-md-11 col-10">
              <h5 class="font-weight-bold mb-3">Recipes</h5>
              <p>Send a message asking for recipe suggestions with specified ingredients or ingredients in one of your shopping lists.</p>
            </div>
          </div>
        </div>
      </div>
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
  height: 1000px;
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

.btn-site-primary {
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

.btn-site-primary:hover {
  background: var(--secondary-color);
}
</style>
<script>
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import firebaseApp from "../firebaseInit";
export default {
  name: "homepage",
  components: {
    SignUp,
    SignIn
  },
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
  }
};
</script>