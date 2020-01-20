<template>
  <div id="signIn" class="container">
    <div class="row">
      <div class="col-sm-8 col-md-8 col-lg-8 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title">Welcome back, Sign In Below!</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  v-model="email"
                  placeholder="Email address"
                  required
                  autofocus
                />
              </div>
              <br />
              <div class="form-label-group">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button
                class="btn btn-lg btn-primary btn-outline-primary"
                @click="signin"
                type="submit"
              >Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
<script>
import { fb } from "../firebaseInit";
import router from "../router";
export default {
  name: "signin",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signin: function(e) {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Login successful for ${user.user.email}`);
            router.go({ name: "groceryDashboard" });
            console.log(user);
          },
          err => {
            alert("error " + err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
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
</style>