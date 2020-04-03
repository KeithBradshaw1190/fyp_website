<template >
  <div id="grocery-dashboard" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3"
          >
            <h1 class="h2 text-center">Dashboard</h1>
          </div>
          <!--Dashboard content  -->
          <div class="container">
            <div v-if="!verified" class="row">
              <div class="card">
                <div class="card-block">
                  <div class="row">
                    <div class="col-6">
                      <h5 class="text-center">Link Shopping Account</h5>
                      <div class="row justify-content-center">
                        <div class="col-12" style="text-align: center">
                          <i class="fas fa-store text-center" style="font-size:3rem;"></i>
                        </div>
                        <small
                          class="text-center"
                        >Linking your account allows you to order deliveries and pickups</small>
                      </div>
                      <div class="text-center">
                        <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                        <button
                          to="/verify-details"
                          class="btn btn-dark btn-fill btn-wd p-2 m-2"
                        >Link Account</button>
                      </div>
                    </div>

                    <div class="col-6">
                      <h5 class="text-center">Make an Order!</h5>
                      <div class="row justify-content-center">
                        <div class="col-12" style="text-align: center">
                          <i
                            class="fab fa-facebook-messenger text-center text-primary"
                            style="font-size:3rem;"
                          ></i>
                        </div>
                        <small
                          class="text-center"
                        >Order information will display here when you create your first order.</small>
                      </div>
                      <div class="text-center">
                        <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                        <button
                          type="submit"
                          class="btn btn-dark btn-fill btn-wd p-2 m-2"
                        >Message Bot</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Dashboard content -->
        </div>
      </div>
    </div>
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
      deliveryList: "",
      deliveryTime: "",
      deliveryCost: "",
      pickupDate: "No Pickups scheduled yet",
      pickupList: "",
      pickupTime: "",
      pickupCost: "",
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
      this.deliveryInfo();
      this.pickupInfo();
      //Pickups
    },
    deliveryInfo: function() {
      //Deliveries
      var storeId = sessionStorage.getItem("storeId");
      if (storeId != null) {
        console.log("NOT NULL");
      } else {
        console.log("nul");
      }
      axios
        .get(
          "https://supermarketmock-api.herokuapp.com/api/delivery/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(
          response => {
            console.log("Then response" + response.status);
            console.log(response.data[0]);

            if (response.status == 200 && response.data[0] == undefined) {
              this.deliveryDate = "No Deliveries yet";
              console.log("IF DELIVERY DATE" + this.deliveryDate);
            } else {
              this.deliveryList = response.data[0].list_name;
              this.deliveryDate = response.data[0].delivery_date;
              this.deliveryDate = response.data[0].delivery_date;
              this.deliveryTime = response.data[0].delivery_time;
              this.deliveryCost = response.data[0].order_price;
            }
          },
          error => {
            console.log("ERr" + error);
          }
        );
    },
    pickupInfo: function() {
      //Deliveries
      axios
        .get(
          "https://supermarketmock-api.herokuapp.com/api/pickup/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(
          response => {
            console.log(response);
            console.log(response.data[0]);

            if (response.status == 200 && response.data[0] == undefined) {
              this.pickupDate = "No Pickups yet";
            } else {
              this.pickupList = response.data[0].list_name;
              this.pickupDate = response.data[0].pickup_date;
              this.pickupTime = response.data[0].pickup_time;
              this.pickupCost = response.data[0].order_price;
            }
          },
          error => {
            console.log(error);
          }
        );
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
            "https://supermarketmock-api.herokuapp.com/api/customer/" +
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

.bg-info-card {
  /* background: #ffba58; */
  /* background: hsla(207, 83%, 41%, 0.44); */
  background: #ff5722;
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
