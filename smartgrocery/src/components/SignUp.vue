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
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="validTesco"
                  name="validTesco"
                />
                <label class="custom-control-label" for="validTesco">
                  <small>I have a valid tesco delivery account(Click here if not)</small>
                </label>
              </div>
              <br />
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
            router.replace("/signin");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>