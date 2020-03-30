<template>
  <div id="verify-details" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3"
          >
            <!-- <h1 v-if="!verified" class="h2">Add a link to Your Local Supermarket</h1>
            <h1 v-if="verified" class="h2">Change Your Delivery Address</h1>-->
          </div>
          <div class="container">
            <div class="card bg-info-card order-card">
              <div class="card-block">
                <form v-if="!verified" id="signup-form" @submit.prevent="processForm">
                  <h5 class="m-b-20 text-center">
                    Sign up to Your Local Supermarket
                    <br />
                    <small
                      class="text-center text-grey"
                    >(Needed for delivery and Collection Services)</small>
                  </h5>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          name="email"
                          v-model="email"
                          class="form-control border-input"
                          placeholder="JohnDowe@mail.com"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          class="form-control border-input"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Delivery Address</label>
                        <input
                          type="text"
                          name="address"
                          v-model="address"
                          class="form-control border-input"
                          placeholder="Home Address"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                    <button
                      type="submit"
                      class="btn btn-success btn-fill btn-wd p-2 m-2"
                    >Create a Link</button>
                  </div>
                </form>
                <!--End Of Store Login-->
                <div v-if="verified" class="row">
                  <div class="col-md-5">
                    <h5 class="m-b-20 text-center">Account Linked Successfully!</h5>
                    <br />
                    <div class="row justify-content-center">
                      <span class="mt-1">
                        <i class="far fa-check-circle text-success" style="font-size:3.2rem;"></i>
                      </span>
                    </div>
                  </div>

                  <div class="col-md-7">
                    <h5 class="m-b-20 text-center">Update Your Delivery Address</h5>
                    <form id="address-form" @submit.prevent="updateAddress">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <!-- <label>Update Your Delivery Address</label> -->
                            <input
                              type="text"
                              name="address"
                              v-model="address"
                              class="form-control border-input"
                              placeholder="No Address set"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="text-center">
                        <!--<button type="submit" class="btn btn-info btn-fill btn-wd p-2">Update Details</button>-->
                        <button
                          type="submit"
                          class="btn btn-success btn-fill btn-wd p-2 m-2"
                        >Update Address</button>
                      </div>
                    </form>
                  </div>
                </div>

                <!--End Of Store Login-->
              </div>
            </div>
          </div>
          <!-- End of card -->

          <!-- End of container -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import firebaseApp from "../firebaseInit";
const db = firebaseApp.firestore();

import axios from "axios";
export default {
  name: "verifyDetails",
  components: {
    Sidebar
  },
  data() {
    return {
      currentUser: firebaseApp.auth().currentUser,
      verified: null,
      storeId: sessionStorage.getItem("storeId"),
      errors: [],
      email: null,
      password: null,
      address: null
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    processForm: function() {
      axios
        .post("https://supermarketmock-api.herokuapp.com/api/register", {
          email: this.email,
          password: this.password,
          address: this.address
        })
        .then(
          response => {
            console.log(response);
            console.log(response.data._id);
            console.log("trying to update store id in firebase");
            if (response.status == 200) {
              db.collection("users")
                .doc(this.currentUser.uid)
                .set(
                  {
                    storeId: response.data._id
                  },
                  { merge: true }
                );
              //Refresh Page
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    updateAddress: function() {
      axios
        .put("https://supermarketmock-api.herokuapp.com/api/customer/" + this.storeId, {
          address: this.address
        })
        .then(
          response => {
            // console.log(response);
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
#verify-details {
  height: 100%;
  min-height: 100%;
  /*background-color: #edf0f5; */
}
body {
  margin-top: 20px;
  /* background: #fafafa; */
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
</style>
