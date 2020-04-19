<template >
  <div id="grocery-dashboard" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3"
          >
            <h1 class="h2">Welcome to the SmartGrocery Dashboard</h1>
          </div>
          <!--Dashboard content  -->
          <!-- Displayed in these possible segments 
            -First Sign up(!deliveryExists &&!pickupExists)&&(!verified && !listCreated && !messengerLink)
            -Process of linking has begun maintain the above but display success on cards that are valid
            -if(!deliveryExists &&!pickupExists)&&(verified && listCreated && messengerLink)->Message Bot cards
            else(deliveryExists &&pickupExists)
          -->
          <div class="container">
            <div class="row" v-if="(!deliveryExists &&!pickupExists)">
              <!-- Grid column for initial sign up-->
              <div class="col-md-6 mb-4">
                <!--Card-->
                <div class="card" v-if="(!listCreated||!messengerLink) && (verified)">
                  <h5 class="card-title text-center mt-3">Shopping Account</h5>
                  <!--Card image-->
                  <div class="card-body">
                    <!-- Link Account Half -->
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i class="fas fa-store text-center" style="font-size:3rem;"></i>
                        <p class="card-text">Shopping Account has been linked successfully.</p>
                      </div>
                      <div class="row justify-content-center">
                        <div class="col-12 p-1" style="text-align: center">
                          <i class="fas fa-check text-center text-success" style="font-size:3rem;"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--/.Card-->

                <!--Card initial sign up-->
                <div class="card" v-if="(!listCreated||!messengerLink) && (!verified)">
                  <h5 class="card-title text-center mt-3 h-100">Firstly Link Shopping Account</h5>
                  <!--Card image-->
                  <div class="card-body row">
                    <!-- Link Account Half -->
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i class="fas fa-store text-center" style="font-size:3rem;"></i>
                        <p class="card-text">This allows you to order deliveries &amp; pickups.</p>
                      </div>
                      <!-- <div class="row justify-content-center">
                        <div class="col-12" style="text-align: center">
                          <i class="fas fa-check text-center text-success" style="font-size:3rem;"></i>
                        </div>
                      </div>-->
                      <router-link
                        class="btn btn-dark btn-fill btn-wd p-2 m-2 text-white"
                        to="/verify-details"
                      >Link Account</router-link>
                    </div>
                  </div>
                </div>
                <!--/.Card initial sign up-->
              </div>
              <!--  Grid column  -->

              <!-- Grid column -->
              <div class="col-md-6 mb-4">
                <!--Card-->
                <div class="card" v-if="(!verified||!messengerLink) && (!listCreated)">
                  <h5 class="card-title text-center mt-3">Then Create a Grocery List</h5>
                  <!--Card image-->
                  <div class="card-body row">
                    <!-- Link Account Half -->
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i class="fas fa-shopping-cart text-center" style="font-size:3rem;"></i>
                        <p
                          class="card-text"
                        >Grocery lists are used to find recipes &amp; make orders</p>
                      </div>
                      <router-link
                        class="btn btn-dark btn-fill btn-wd p-2 m-2 text-white"
                        to="/addItem"
                      >Create First List</router-link>
                    </div>
                  </div>
                </div>
                <!--/.Card-->
                <!--Card-->
                <div class="card" v-if="(!verified || !messengerLink) && (listCreated)">
                  <h5 class="card-title text-center mt-3">Grocery List</h5>
                  <!--Card image-->
                  <div class="card-body">
                    <!-- Link Account Half -->
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i class="fas fa-shopping-cart text-center" style="font-size:3rem;"></i>
                        <p class="card-text">You have successfully created a grocery list.</p>
                      </div>
                      <div class="row justify-content-center">
                        <div class="col-12 p-1" style="text-align: center">
                          <i class="fas fa-check text-center text-success" style="font-size:3rem;"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--/.Card-->
              </div>
              <!-- Grid column -->
              <div class="col-md-12 mb-4">
                <!--Card initial sign up-->
                <div class="card" v-if="(!verified || !listCreated || !messengerLink)">
                  <h5 class="card-title text-center mt-3">Message the Bot</h5>
                  <!--Card image-->
                  <div class="card-body">
                    <!-- Link Account Half -->
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i
                          class="fab fa-facebook-messenger text-center text-primary"
                          style="font-size:3rem;"
                        ></i>
                        <p class="card-text">
                          Click the send message button on the facebook page followed by 'Get started' in the chat window.
                          You'll be prompted to sign into your SmartGrocery account. After that you are all set up!
                        </p>
                      </div>

                      <a
                        class="btn btn-dark btn-fill btn-wd p-2 m-2 text-white"
                        href="https://www.facebook.com/SmartGrocery-103970551177074"
                      >Send Message</a>
                    </div>
                  </div>
                </div>
                <!--/.Card-->
              </div>
              <!-- Grid column -->
            </div>

            <!-- When Verified -->
            <div v-if="(verified && listCreated && messengerLink)" class="row">
              <div v-if="deliveryExists" class="col-md-6 col-xl-6 pt-4">
                <div class="card">
                  <div class="card-block">
                    <h4 class="m-b-20 text-center">
                      <i class="fas fa-truck" style="font-size:18px;"></i> Latest Delivery Details
                      <br />
                    </h4>
                    <br />

                    <div class="row">
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-clipboard-list" style="font-size:18px;"></i>
                        {{ deliveryList }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-calendar-day" style="font-size:18px;"></i>
                        Date {{ deliveryDate }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="far fa-clock" style="font-size:18px;"></i>
                        Expect at {{ deliveryTime.slice(0, -3) }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-euro-sign mt-1" style="font-size:18px;"></i>
                        Cost {{ deliveryCost }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DElivery Doesnt Exist -->

              <div v-if="!deliveryExists" class="col-md-6 col-xl-6 pt-4">
                <div class="card">
                  <div class="card-block">
                    <h5 class="text-center">Schedule a Delivery!</h5>
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i
                          class="fab fa-facebook-messenger text-center text-primary"
                          style="font-size:3rem;"
                        ></i>
                      </div>
                      <small class="text-center">No Deliveries have been made yet!</small>
                    </div>
                    <div class="text-center">
                      <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                      <a
                        href="https://www.facebook.com/SmartGrocery-103970551177074"
                        class="btn btn-dark btn-fill btn-wd p-2 m-2"
                      >Schedule a Delivery</a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End of deilvery doesnt exist -->
              <div v-if="pickupExists" class="col-md-6 col-xl-6 pt-4">
                <div class="card">
                  <div class="card-block">
                    <h4 class="m-b-20 text-center">
                      <i class="fas fa-shopping-basket" style="font-size:22px;"></i> Latest Pickup Details
                      <br />
                      <!-- <small>List Name: {{ pickupList }}</small> -->
                    </h4>
                    <br />

                    <div class="row">
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-clipboard-list" style="font-size:18px;"></i>
                        {{ pickupList }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-calendar-day" style="font-size:18px;"></i>
                        Date {{ pickupDate }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="far fa-clock" style="font-size:18px;"></i>
                        Ready at {{ pickupTime.slice(0, -3) }}
                      </h5>
                      <h5 class="col-6 mt-2">
                        <i class="fas fa-euro-sign mt-1" style="font-size:18px;"></i>
                        Cost {{ pickupCost }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pickup Doesnt Exist -->

              <div v-if="!pickupExists" class="col-md-6 col-xl-6 pt-4">
                <div class="card">
                  <div class="card-block">
                    <h5 class="text-center">Schedule a Pickup!</h5>
                    <div class="row justify-content-center">
                      <div class="col-12" style="text-align: center">
                        <i
                          class="fab fa-facebook-messenger text-center text-primary"
                          style="font-size:3rem;"
                        ></i>
                      </div>
                      <small class="text-center">No Pickups have have been made yet!</small>
                    </div>
                    <div class="text-center">
                      <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                      <a
                        href="https://www.facebook.com/SmartGrocery-103970551177074"
                        class="btn btn-dark btn-fill btn-wd p-2 m-2"
                      >Schedule a Pickup</a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End of deilvery doesnt exist -->
            </div>
            <!-- End of When Verified -->
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
      deliveryDate: "",
      deliveryList: "",
      deliveryTime: "",
      deliveryCost: "",
      pickupDate: "",
      pickupList: "",
      pickupTime: "",
      pickupCost: "",
      verified: null,
      listCreated: null,
      messengerLink: null,
      storeId: sessionStorage.getItem("storeId"),
      deliveryExists: false,
      pickupExists: false
    };
  },
  created() {
    this.fetchInfo();
    this.loadData();
    this.checkList();
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
              this.deliveryDate = "00/00/00";
              console.log("IF DELIVERY DATE" + this.deliveryDate);
            } else {
              this.deliveryExists = true;
              this.deliveryList = response.data[0].list_name;
              //reformat date
              var datePart = response.data[0].delivery_date.match(/\d+/g),
                year = datePart[0].substring(2),
                month = datePart[1],
                day = datePart[2];
              this.deliveryDate = day + "/" + month + "/" + year;
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
            // console.log(response);
            //console.log(response.data[0]);

            if (response.status == 200 && response.data[0] == undefined) {
              this.pickupDate = "00/00/00";
            } else {
              this.pickupExists = true;
              this.pickupList = response.data[0].list_name;
              //reformat date
              var datePart = response.data[0].pickup_date.match(/\d+/g),
                year = datePart[0].substring(2), // get only two digits
                month = datePart[1],
                day = datePart[2];
              this.pickupDate = day + "/" + month + "/" + year;
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
      if (this.messengerLink == null || this.verified == null) {
        console.log("load data");
        db.collection("users")
          .doc(this.currentUser.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              if (doc.get("storeId")) {
                console.log("StoreID Exists");
                sessionStorage.setItem("storeId", doc.get("storeId"));
              }
              if (doc.get("messengerID")) {
                console.log("messengerID Exists");
                sessionStorage.setItem("messengerLink", true);
              }
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
      if (sessionStorage.getItem("messengerLink") == "true") {
        this.messengerLink = true;
      }

      if (sessionStorage.getItem("storeId") != null) {
        this.verified = true;
        axios
          .get(
            "https://supermarketmock-api.herokuapp.com/api/customer/" +
              sessionStorage.getItem("storeId")
          )
          .then(
            response => {
              // console.log(response);
              // console.log(response.data.address);

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
    },
    checkList: function() {
      console.log("Check session" + sessionStorage.getItem("listCreated"));
      if (sessionStorage.getItem("listCreated") == null) {
        console.log("Check session" + sessionStorage.getItem("listCreated"));

        db.collection("shopping_lists")
          .where("uid", "==", this.currentUser.uid)
          .get()
          .then(snapshot => {
            if (!snapshot.empty) {
              sessionStorage.setItem("listCreated", true);
              this.listCreated = sessionStorage.getItem("listCreated");
              return;
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      } else {
        this.listCreated = true;
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
