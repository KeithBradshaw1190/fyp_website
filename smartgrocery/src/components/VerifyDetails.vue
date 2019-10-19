<template id="details">
  <div id="grocery-dashboard" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3 border-bottom"
          >
            <h1 class="h2">Verify Store Login</h1>
          </div>
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="form-group">
                  <label class="control-label">Your Store Login</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">Your Store Password</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div>
                  <button class="btn">Verify</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./Sidebar";
export default {
  name: "details ",
  components: {
    Sidebar
  },
  data() {
    return {};
  }
};
</script>