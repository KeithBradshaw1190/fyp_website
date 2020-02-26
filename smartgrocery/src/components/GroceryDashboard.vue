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
                  <h6 class="m-b-20">Latest Scheduled Delivery Date</h6>
                  <h2 class="text-right">
                    <i class="fa fa-calender f-left"></i>
                    <span>{{ deliveryDate }}</span>
                  </h2>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-xl-6 pt-4">
              <div class="card bg-c-yellow order-card">
                <div class="card-block">
                  <h6 class="m-b-20">Latest Scheduled Pickup Date</h6>
                  <h2 class="text-right">
                    <i class="fa fa-rocket f-left"></i>
                    <span>{{ pickupDate }}</span>
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
                    <span>{{ pickupCount }}</span>
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
                    <span>{{ deliveryCount }}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of dashboard container-->
      </div>
    </div>
    <!-- End of row-->
  </div>
</template>

<script>
import firebaseApp from "../firebaseInit";
import Sidebar from "./Sidebar";
import axios from "axios";
const db = firebaseApp.firestore();
export default {
  name: "grocery-dashboard",
  components: {
    Sidebar
  },
  data() {
    return {
      currentUser: firebaseApp.auth().currentUser,
      deliveryDate: "No Deliveries scheduled yet",
      pickupDate: "No Pickups scheduled yet",
      deliveryCount: 0,
      pickupCount: 0,
      verified: null,
      storeId: sessionStorage.getItem("storeId")
    };
  },
  created() {
    this.fetchInfo();
    this.loadData();
  },
  methods: {
    fetchInfo: function() {
      //Deliveries
      axios
        .get(
          "http://localhost:3002/api/delivery/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(
          response => {
            console.log(response);
            console.log(response.data[0]);

            if (response.status == 200 && (response.data == undefined)) {
              this.deliveryDate = response.data[0].delivery_date;
            } else {
              this.deliveryDate = "No Deliveries yet";
            }
          },
          error => {
            console.log(error);
          }
        );
      //Pickups
    },
    loadData: function() {
      console.log("Checking storage" + sessionStorage.getItem("storeId"));
      console.log("uid: " + this.currentUser.uid);

      // you can load data from here and assign response in to variable
      db.collection("users")
        .doc(this.currentUser.uid)
        .get()
        .then(function(doc) {
          if (doc.exists && doc.get("storeId")) {
            console.log(doc.get("storeId"));
            sessionStorage.setItem("storeId", doc.get("storeId"));
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
      if (sessionStorage.getItem("storeId") != null) {
        this.verified = true;
        axios
          .get(
            "http://localhost:3002/api/customer/" +
              sessionStorage.getItem("storeId")
          )
          .then(
            response => {
              console.log(response);
              console.log(response.data.address);

              if (response.status == 200) {
                this.address = response.data.address;
              }
            },
            error => {
              console.log(error);
            }
          );
      } else {
        this.verified = false;
      }
    }
  }
};
</script>
<style scoped>
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
</style>
