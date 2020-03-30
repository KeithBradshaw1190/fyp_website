<template>
  <div id="add-Item" class="container-fluid bg-light main-panel">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            <div class="card card-user">
              <div class="content">
                <div class="author">
                  <h4 class="title" v-if="listName != ''">
                    {{ listName }}
                    <br />
                  </h4>
                  <h4 class="title" v-if="listName == ''">
                    List Name
                    <br />
                  </h4>
                </div>

                <div class="container">
                  <!-- <ul class="list-group-flush mb-3 item">
                    <li class="list-group-item d-flex justify-content-between lh-condensed item">
                      <div>
                        <h6 class="my-0">Product name</h6>
                        <small class="text-muted">Quantity: 1</small>
                      </div>
                      <span class="text-success">$12</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed item">
                      <div>
                        <h6 class="my-0">Second product</h6>
                        <small class="text-muted">Quantity: 1</small>
                      </div>
                      <span class="text-success">$8</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed item">
                      <div>
                        <h6 class="my-0">Third item</h6>
                        <small class="text-muted">Quantity: 1</small>
                      </div>
                      <span class="text-success">$5</span>
                    </li>
                  </ul>-->
                </div>
                <!--end shopping-cart -->
              </div>
              <!-- <hr />
              <div class="text-center">
                <div class="row">
                  <div class="col-md-5">
                    <h5>
                      0
                      <br />
                      <small>Items</small>
                    </h5>
                  </div>
                  <div class="col-md-7">
                    <h5>
                      €0
                      <br />
                      <small>Total Cost</small>
                    </h5>
                  </div>
                </div>
              </div>-->
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="card">
              <div class="header">
                <h4 class="title">Create List</h4>
              </div>
              <div class="content">
                <form id="createListForm">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>List Name</label>
                        <input
                          type="text"
                          v-model="listName"
                          class="form-control border-input"
                          placeholder="Name Of List"
                          required
                          @keyup="validateListName"
                        />
                        <p class="text-danger" v-if="errorMessage">{{errorMessageValue}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <label>Product</label>
                      <AutoCompleteSearch
                        :place-holder-text="placeHolderInputText"
                        :result-items="autoCompleteResult"
                        :on-key-up="onKeyUpAutoCompleteEvent"
                        :on-selected="onSelectedAutoCompleteEvent"
                        :auto-complete-progress="autoCompleteProgress"
                        :item-text="autoCompleteText"
                        :item-id="autoCompleteFieldId"
                        :item-image="autoCompleteImage"
                      ></AutoCompleteSearch>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          class="form-control border-input"
                          required
                          min="1"
                          v-model="quantity"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>
                          Expiry Date
                          <small>(Optional)</small>
                        </label>
                        <input type="text" class="form-control border-input" value="01/01/20" />
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <button
                      type="submit"
                      @click="createList"
                      class="btn btn-secondary btn-fill btn-wd"
                      id="btnCreateList"
                    >Add Product &amp; Create List</button>
                  </div>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
            <!-- end of CREATE list card -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseInit";
import Sidebar from "./Sidebar";
import products from "../assets/products";
import AutoCompleteSearch from "./AutoCompleteSearch";
import axios from "axios";
const db = firebaseApp.firestore();

export default {
  name: "add-item",
  mounted() {
    this.products = products;
  },
  components: {
    Sidebar,
    AutoCompleteSearch
  },
  data() {
    return {
      currentUser: firebaseApp.auth().currentUser,
      placeHolderInputText: "Search for a Product",
      autoCompleteResult: [],
      autoCompleteProgress: false,
      autoCompleteText: "name",
      autoCompleteFieldId: "price",
      autoCompleteImage: "image",
      productList: {},
      listName: "",
      quantity: null,
      listNames: [],
      errorMessageValue: null,
      errorMessage: false,
      messengerID: null
    };
  },
  created() {
    this.getListNames();
  },
  methods: {
    onSelectedAutoCompleteEvent(price, name, img) {
      console.log(price, name, img);

      this.autoCompleteProgress = false;
      this.autoCompleteResult = [];
      var product = { name: name, price: price, img: img };
      this.placeHolderInputText = name;
      this.productList = product;
    },

    onKeyUpAutoCompleteEvent(keywordEntered) {
      //reset

      this.autoCompleteResult = [];
      this.autoCompleteProgress = false;
      if (keywordEntered.length > 1) {
        this.autoCompleteProgress = true;
        axios({
          method: "get",
          url:
            "https://dev.tescolabs.com/grocery/products/?query=" +
            keywordEntered +
            "&offset=0&limit=10",
          headers: {
            "Ocp-Apim-Subscription-Key": "30661c41f57f4b1e8351e4834c462e40"
          }
        })
          .then(response => {
            // console.log(response.data.uk.ghs.products.results);
            var newData = [];
            response.data.uk.ghs.products.results.forEach(function(
              item,
              index
            ) {
              console.log(item);
              if (
                item.name.toLowerCase().indexOf(keywordEntered.toLowerCase()) >=
                0
              ) {
                newData.push(item);
              }
            });
            this.autoCompleteResult = newData;
            this.autoCompleteProgress = false;
          })
          .catch(e => {
            this.autoCompleteProgress = false;
            this.autoCompleteResult = [];
          });
      } else {
        this.autoCompleteProgress = false;
        this.autoCompleteResult = [];
      }
    },
    createList() {
      if (this.errorMessage === false && this.listName != "") {
        this.productList.quantity = this.quantity;
        var plist = this.productList;
        db.collection("shopping_lists")
          .add({
            uid: this.currentUser.uid,
            listName: this.listName,
            items: [plist]
          })
          .then(docRef => {
            var id = docRef.id;
            console.log(id);
            this.$router.push({ name: "modify-list", params: { id: id } });
          })
          .catch(err => {
            this.$router.push({ name: "groceryLists", params: { id: id } });
            this.errorMessage = err.message;
          });
      }
    },
    getListNames() {
      var listNames = [];

      let shoppingListRef = db.collection("shopping_lists");
      let query = shoppingListRef
        .where("uid", "==", this.currentUser.uid)
        .get()
        .then(snapshot => {
          var messengerID;
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data().listName);
            listNames.push(doc.data().listName.toLowerCase());
            if (doc.data().messengerID) {
              messengerID = doc.data().messengerID;
            } else {
              messengerID = null;
            }
          });
          //assign to local values
          this.messengerID = messengerID;
          this.listNames = listNames;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        })
        .then(() => {
          this.checkForMessengerID();
        });
    },
    checkForMessengerID() {
      //local value should be null as it is not in the shopping list document
      console.log("check for messengerID" + this.messengerID);

      if (this.messengerID == null) {
        var messengerID;
        //This means we need to get it from the users document
        db.collection("users")
          .doc(this.currentUser.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log("checkformessenger" + doc.data().messengerID);
              messengerID = doc.data().messengerID;

              //then call method to add messenger ID to lists
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          })
          .then(() => {
            this.messengerID = messengerID;
            if (this.messengerID != null) {
              this.addMessengerIDToLists();
            } else {
              console.log("Messenger ID is still not set! " + this.messengerID);
            }
          });
      }
    },
    addMessengerIDToLists() {
      console.log("addMessengerIDToLists" + this.messengerID);
      const newDocumentBody = {
        messengerID: this.messengerID
      };
      db.collection("shopping_lists")
        .where("uid", "==", this.currentUser.uid)
        .get()
        .then(response => {
          let batch = db.batch();
          response.docs.forEach(doc => {
            const docRef = db.collection("shopping_lists").doc(doc.id);
            batch.update(docRef, newDocumentBody);
          });
          batch.commit().then(() => {
            console.log(`updated all documents inside`);
          });
        });
    },
    validateListName() {
      var lowerListName = this.listName.toLowerCase();
      if (this.listNames.includes(lowerListName)) {
        this.errorMessage = true;
        this.errorMessageValue = "A list with this name exists already.";
      } else if (this.listName == "") {
        this.errorMessage = true;
        this.errorMessageValue = "The List Name can't be empty!";
      } else {
        this.errorMessage = false;
      }
    }
  }
};
</script>
<style scoped>
#add-Item {
  height: 100%;
  min-height: 100%;
  background-color: #edf0f5;
}
body {
  margin-top: 20px;
  /* background: #fafafa; */
}
/*#81cfe0; */
.Slist .btn-link:hover,
.Slist .btn-link:focus {
  text-decoration: none;
}

.Slist {
  margin: 50px auto;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}

.myaccordion li + li {
  margin-top: 10px;
}
.card-header {
  background-color: #ffffff;
  border-bottom: 0;
  text-align: center;
}
.center {
  margin: auto;
}
#editBtn {
  padding-top: 0;
  padding-bottom: 5px;
}
.list-title {
  padding-bottom: 0;
  margin-bottom: 0;
}
.listName {
  color: black;
}
.itemsCount {
  font-size: 0.8rem;
}
.form-control:focus {
  box-shadow: none;
}

.form-control-underlined {
  border-width: 0;
  border-bottom-width: 1px;
  border-radius: 0;
  padding-left: 0;
}

/*==================================================================*/
.main-panel > .content {
  padding: 30px 15px;
  min-height: calc(100vh - 123px);
}

.card {
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
.card .title {
  margin: 0;
  color: #252422;
  font-weight: 300;
}
.card .header {
  padding: 20px 20px 0;
}
.card .content {
  padding: 15px 15px 10px 15px;
}

.card-user .author .title {
  color: #403d39;
}
.card-user .title {
  font-weight: 600;
  line-height: 24px;
}
.card-user .author {
  text-align: center;
  text-transform: none;
}
.row {
  margin-left: 15px;
}
/*------------------------------------------------------------------*/
.item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 0;
}
</style>
