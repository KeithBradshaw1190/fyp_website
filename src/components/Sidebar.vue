<template id="sidebar">
  <nav class="sidebar sidebar-default sidebar-separate sidebar-fixed pt-4">
    <div class="sidebar-content">
      <div class="sidebar-category sidebar-default">
        <div class="sidebar-user rounded">
          <div class="category-content">
            <h6>Good to see You!</h6>
            <small>{{ currentUser.displayName }}</small>
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
              <router-link class="nav-link" to="/GroceryLists/">
                <i class="fas fa-shopping-cart"></i>
                Grocery Lists
              </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!verified" class="nav-link" to="/verify-details">
                <i class="fas fa-store"></i>Verify Store Login
              </router-link>
              <router-link v-if="verified" class="nav-link" to="/verify-details">
                <i class="fas fa-home"></i>Change Delivery Address
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.facebook.com/SmartGrocery-103970551177074">
                <i class="fab fa-facebook-messenger text-primary"></i>
                Visit Facebook Page
              </a>
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
import firebaseApp from "../firebaseInit";
import router from "../router";
export default {
  name: "sidebar",
  data() {
    return {
      currentUser: firebaseApp.auth().currentUser,
      verified: null
    };
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      this.currentUser = firebaseApp.auth().currentUser;
    }
    if (sessionStorage.getItem("storeId") != null) {
      console.log(sessionStorage.getItem("storeId"));
      this.verified = true;
    }
  }
};
</script>
<style scoped>
.sidebar {
  position: relative;
  width: 100%;
  z-index: 99;
}
.sidebar .sidebar-user .category-content {
  padding: 1rem;
  text-align: center;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.sidebar .sidebar-user .category-content:first-child {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.sidebar .sidebar-user .category-content:last-child {
  border-top-right-radius: 0.25rem;
  border-top-left-radius: 0.25rem;
}
.sidebar .sidebar-content {
  position: relative;
  border-radius: 0.25rem;
  margin-bottom: 1.25rem;
}
.sidebar .category-title {
  position: relative;
  margin: 0;
  padding: 12px 20px;
  padding-right: 46px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.sidebar.sidebar-default .category-title {
  border-bottom-color: #dee2e6;
}
.sidebar.sidebar-default .category-title > span {
  display: block;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
}
.center-title {
  font-weight: 500;
  font-size: 1.25rem;
  font-style: bold;
}
.sidebar.sidebar-default .category-content .nav li > a {
  color: #333;
}
.sidebar.sidebar-default .category-content .nav li > a:focus,
.sidebar.sidebar-default .category-content .nav li > a:hover,
.sidebar.sidebar-default .category-content .nav li > a[aria-expanded="true"] {
  background-color: #f4f4f4;
}
.sidebar .category-content {
  position: relative;
}
.sidebar .category-content .nav {
  position: relative;
  margin: 0;
  padding: 0.5rem 0;
}
.sidebar .category-content .nav li {
  position: relative;
  list-style: none;
}
.sidebar .category-content .nav li > a {
  font-size: 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.sidebar .category-content .nav li > a > i {
  float: left;
  top: 0;
  margin-top: 2px;
  margin-right: 15px;
}
.sidebar .category-content .nav li ul {
  padding: 0;
}
.sidebar .category-content .nav li ul > li a {
  padding-left: 2.75rem;
}
.sidebar .category-content .nav > li > a {
  font-weight: 500;
}
@media (min-width: 768px) {
  .sidebar {
    padding-top: 2rem !important;
    display: table-cell;
    vertical-align: top;
    width: 280px;
    padding: 0 1.25rem;
  }
  .sidebar.sidebar-fixed {
    position: sticky;
    top: 5.5rem;
  }
  .sidebar.sidebar-default .sidebar-category {
    background-color: #fff;
  }
  .sidebar.sidebar-separate .sidebar-content {
    box-shadow: none;
  }
  .sidebar.sidebar-separate .sidebar-category {
    margin-bottom: 1.25rem;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
</style>
