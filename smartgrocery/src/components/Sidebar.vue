<template id="sidebar">
  <nav class="sidebar sidebar-default sidebar-separate sidebar-fixed pt-4">
    <div class="sidebar-content">
      <div class="sidebar-category sidebar-default">
        <div class="sidebar-user rounded">
          <div class="category-content">
            <h6>Good to see You!</h6>
            <small>{{currentUser}}</small>
          </div>
        </div>
      </div>
      <!-- /Sidebar Category -->
      <div class="sidebar-category sidebar-default">
        <div class="category-title">
          <span>Options</span>
        </div>
        <div class="category-content">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="/verify-details">
                <i class="fas fa-store"></i>Verify Store Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add-dashboard/">
                <i class="fas fa-shopping-cart"></i>
                View Your Groceries
              </router-link>
            </li>
          </ul>
          <!-- /Nav -->
        </div>
        <!-- /Category Content -->
      </div>
      <!-- /Sidebar Category -->
    </div>
  </nav>
</template>
<script>
import { fb } from "../firebaseInit";
import router from "../router";
export default {
  name: "sidebar",
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