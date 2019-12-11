<template>
  <div id="add-grocery" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3 border-bottom"
          >
            <h1 class="h2">Your Grocery List</h1>
          </div>
          <div class="container">
            <ul class="list-group list-group-horizontal-lg">
              <li class="list-group-item">Item Name</li>
              <li class="list-group-item">Amount Needed</li>
              <li class="list-group-item">Expiry Date(Optional)</li>
              <li class="list-group-item">Frequency of Purchase(Optional)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb } from "../firebaseInit";
import Sidebar from "./Sidebar";
export default {
  name: "add-grocery",
  components: {
    Sidebar
  },
  data() {
    return {
      currentUser: false
    };
  },
  created() {
    if (fb.auth().currentUser) {
      this.currentUser = fb.auth().currentUser.email;
    }
  }
};
</script>
<style scoped>
#add-grocery {
  height: 100%;
  min-height: 100%;
  /*background-color: #edf0f5; */
}
body {
  margin-top: 20px;
  /* background: #fafafa; */
}
</style>