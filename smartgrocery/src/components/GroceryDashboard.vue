<template >
  <div id="grocery-dashboard" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3 border-bottom"
          >
            <h1 class="h2">Dashboard</h1>
          </div>
          <div class="row">
            <div class="col-md-6 col-xl-6 pt-4">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Next Delivery Date</h6>
                  <h2 class="text-right">
                    <i class="fa fa-calender f-left"></i>
                    <span>12/12/19</span>
                  </h2>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-xl-6 pt-4">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Next Pick-up Scheduled</h6>
                  <h2 class="text-right">
                    <i class="fa fa-rocket f-left"></i>
                    <span>12/12/19</span>
                  </h2>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-xl-6 pt-4">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Total Deliveries Ordered</h6>
                  <h2 class="text-right">
                    <i class="fa fa-refresh f-left"></i>
                    <span>6</span>
                  </h2>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-xl-6 pt-4">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Total Pick-ups Scheduled</h6>
                  <h2 class="text-right">
                    <i class="fa fa-credit-card f-left"></i>
                    <span>2</span>
                  </h2>
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
import { fb } from "../firebaseInit";
import Sidebar from "./Sidebar";
export default {
  name: "grocery-dashboard",
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
<style>
/* 4px: $spacer * 0.25 8px: $spacer * 0.5 16px: $spacer 20px: $spacer * 1.25 24px: $spacer * 1.5 */
#grocery-dashboard {
  height: 100%;
  min-height: 100%;
  /*background-color: #edf0f5; */
}
body {
  margin-top: 20px;
  /* background: #fafafa; */
}
.order-card {
  color: #fff;
}

.bg-c-green {
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-blue {
  background: linear-gradient(45deg, #457aa7, #5784b8);
}

.bg-c-yellow {
  background: #ffba58;
}

.bg-c-pink {
  background: linear-gradient(45deg, #ff5370, #ff869a);
}
.bg-c-black {
  background: linear-gradient(45deg, #0a0a0a, #5f5d5d);
}
.bg-c-grey {
  background: linear-gradient(45deg, #bebebe, #d4d1d2);
}
.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.card .card-block {
  padding: 25px;
}

.order-card i {
  font-size: 26px;
}

.f-left {
  float: left;
}

.f-right {
  float: right;
}
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
