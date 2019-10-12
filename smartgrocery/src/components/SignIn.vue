<template>
  <div class="container">
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
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button class="btn btn-lg btn-primary btn-outline-primary" type="submit">Log In</button>
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
export default {
  name: "signin",
  data() {
    return {};
  }
};
</script>