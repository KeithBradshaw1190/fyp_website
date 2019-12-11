<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 col-md-8 col-lg-8 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title">Time to make shopping a whole lot easier!</h5>

            <form class="form-signin">
              <div class="form-label-group">
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Email address"
                  v-model="email"
                />
              </div>
              <br />
              <div class="form-label-group">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="form-label-group">
                <input
                  type="password"
                  id="password-confirm"
                  class="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <hr />
              <button class="btn btn-lg btn-outline-primary" @click="signup" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <!--Sign In -->
      <div class="col-sm-4 col-md-4 col-lg-4 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Already Have an Account?</h5>
            <p
              class="text-center"
            >If you already has an account, go ahead and sign in. We've missed you!</p>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { fb } from "../firebaseInit";
import router from "../router";
export default {
  name: "signup",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signup: function(e) {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account Created for ${user.user.email}`);
            this.router.go({
              path: this.router.path
            });
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