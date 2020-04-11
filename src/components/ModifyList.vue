<template>
  <div id="add-Item" class="container-fluid bg-light main-panel">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            <div class="accordion" id="myAccordion">
              <div class="card card-user">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      type="button"
                      class="btn btn-link author"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                    >
                      <div class="author">
                        <h4 class="title" v-if="listName != ''">
                          {{ listName }}
                          <br />
                          <small class="text-grey">(Click to expand)</small>
                        </h4>
                        <h4 class="title" v-if="listName == ''">
                          List Name
                          <br />
                        </h4>
                      </div>
                    </button>
                  </h2>
                </div>
                <hr />
                <div class="text-center">
                  <div v-if="!changes" class="row">
                    <div class="col-md-3">
                      <h5>
                        {{ amountOfItems }}
                        <br />
                        <small>Items</small>
                      </h5>
                    </div>
                    <div class="col-md-4">
                      <h5>
                        €{{ totalPrice }}
                        <br />
                        <small>Total Cost</small>
                      </h5>
                    </div>
                    <div class="col-md-4 mt-2">
                      <small class="mt-3 mr-1">
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="deleteList"
                        >Delete List</button>
                      </small>
                    </div>
                  </div>
                  <!--Row for changes -->
                  <div v-if="changes" class="row">
                    <div class="col-md-3">
                      <h5>
                        {{ amountOfItems }}
                        <br />
                        <small>Items</small>
                      </h5>
                    </div>
                    <div class="col-md-4">
                      <h5>
                        €{{ totalPrice }}
                        <br />
                        <small>Total Cost</small>
                      </h5>
                    </div>
                    <div class="col-md-4 mt-2">
                      <small class="mt-3 mr-1">
                        <button
                          class="btn btn-sm btn-outline-success"
                          @click="updateList"
                        >Save Changes</button>
                      </small>
                    </div>
                  </div>
                  <!-- Row for changes -->
                </div>
                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#myAccordion"
                >
                  <div class>
                    <div class="content container">
                      <div class>
                        <ul class="list-group-flush mb-3 item">
                          <li
                            v-for="(item, index) in shoppingLists[0]"
                            v-bind:key="index"
                            class="list-group-item d-flex justify-content-between lh-condensed item"
                          >
                            <div>
                              <h6 class="my-0">
                                <a
                                  class="text-danger"
                                  @click="deleteItemFromLocalList(index)"
                                >X Remove</a>
                                <br />
                                {{ item.name }}
                              </h6>
                              <div class="quantity">
                                <small class="text-success mr-3">Price: €{{ item.price }}</small>
                                <!-- <small class="text-muted"
                                  >Quantity: {{ item.quantity }}</small
                                >-->

                                <div class="input-group">
                                  <div class="input-group-prepend">
                                    <small class="input-group-text">Quantity</small>
                                  </div>
                                  <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    v-model="item.quantity"
                                    v-on:change="event => changeLocalQuantity(index, event)"
                                    class="form-control form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!--end shopping-cart -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Begining of list col -->

          <!-- End of List col -->
          <div class="col-lg-8 col-md-7">
            <div class="card">
              <div class="header">
                <h4 class="title">Add Products</h4>
              </div>
              <div class="content">
                <form id="createListForm">
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
                        :item-department="AutoCompleteDepartment"
                      ></AutoCompleteSearch>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          class="form-control border-input"
                          required
                          v-model="quantity"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>
                          Product Purchase Frequency
                          <small>(Optional)</small>
                        </label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="frequencySelect">Frequency</label>
                          </div>
                          <select v-model="frequency" class="custom-select" id="frequencySelect">
                            <option value="none" selected>Choose Purchase Frequency</option>
                            <option value="More than opw">More than Once A Week</option>
                            <option value="Once a Week">Once A Week</option>
                            <option value="Bi-Weekly">Bi-Weekly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <button
                      type="submit"
                      @click="addToList"
                      class="btn btn-secondary btn-fill btn-wd"
                      id="btnCreateList"
                    >Add Product</button>
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
import router from "../router";
import Sidebar from "./Sidebar";
import AutoCompleteSearch from "./AutoCompleteSearch";
import axios from "axios";
const db = firebaseApp.firestore();

export default {
  name: "modify-list",
  components: {
    Sidebar,
    AutoCompleteSearch
  },
  //each autocomplete value is an attribute to select from Tesco API
  data() {
    return {
      currentUser: false,
      placeHolderInputText: "Search for a Product",
      autoCompleteResult: [],
      autoCompleteProgress: false,
      autoCompleteText: "name",
      autoCompleteFieldId: "price",
      autoCompleteImage: "image",
      AutoCompleteDepartment: "superDepartment",
      ingredientName: "",
      listName: "",
      amountOfItems: 0,
      totalPrice: null,
      quantity: null,
      frequency: "none",
      listId: null,
      shoppingLists: [],
      changes: false,
      messengerID: null
    };
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      this.currentUser = firebaseApp.auth().currentUser;
    }
    this.listId = this.$route.params.id;

    this.fetchListItems(this.listId);
  },
  methods: {
    onSelectedAutoCompleteEvent(price, name, img, department) {
      console.log(price, name, img, department);

      this.autoCompleteProgress = false;
      this.autoCompleteResult = [];
      var product = {
        name: name,
        price: price,
        img: img,
        department: department
      };
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
            //Use the suggested item as a possible ingredient string(It has no additional product info-saves parsing)
            this.ingredientName =
              response.data.uk.ghs.products.suggestions[0].text;
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
    addToList() {
      if (this.productList != null) {
        this.productList.quantity = this.quantity;
        this.productList.frequency = this.frequency;
        //Simple name used for recipe search in chatbot
        this.productList.simpleName = this.ingredientName;
        var listRef = db.collection("shopping_lists").doc(this.listId);
        var plist = this.productList;

        let transaction = db
          .runTransaction(t => {
            return t.get(listRef).then(doc => {
              console.log(doc.data().items);
              var newItems = doc.data().items.concat(this.productList);
              console.log(newItems);
              t.update(listRef, {
                list_price: this.totalPrice,
                list_quantity: this.quantity,
                items: newItems
              });
            });
          })
          .then(result => {
            console.log("Transaction success!");
            this.$router.go();
          })
          .catch(err => {
            console.log("Transaction failure:", err);
          });
      } else {
        console.log("problem");
      }
    },
    deleteItemFromLocalList(itemindex) {
      this.changes = true;
      var localSlist = this.shoppingLists[0];
      localSlist.splice(itemindex, 1);
      var totalp = 0;

      //Adjust new total price
      localSlist.forEach(element => {
        totalp = totalp + element.quantity * element.price;
      });
      this.totalPrice = totalp.toFixed(2);
      this.amountOfItems = localSlist.length;
      console.log(totalp);
      console.log(localSlist.length);
    },
    changeLocalQuantity(itemindex) {
      this.changes = true;
      var localSlist = this.shoppingLists[0];
      this.shoppingLists[0][itemindex] = localSlist[itemindex];
      var totalp = 0;
      localSlist.forEach(element => {
        totalp = totalp + element.quantity * element.price;
      });
      this.totalPrice = totalp.toFixed(2);
      this.amountOfItems = localSlist.length;
    },
    updateList() {
      if (this.changes == true) {
        var localSlist = this.shoppingLists[0];

        var listRef = db.collection("shopping_lists").doc(this.listId);

        let transaction = db
          .runTransaction(t => {
            return t.get(listRef).then(doc => {
              console.log(doc.data().items);
              var newItems = localSlist;
              console.log(newItems);
              t.update(listRef, {
                list_price: this.totalPrice,
                list_quantity: this.amountOfItems,
                items: newItems
              });
            });
          })
          .then(result => {
            console.log("Transaction success!");
            this.$router.go();
          })
          .catch(err => {
            console.log("Transaction failure:", err);
          });
      } else {
        console.log("problem");
      }
    },
    deleteList() {
      db.collection("shopping_lists")
        .doc(this.listId)
        .delete()
        .then(() => {
          this.$router.push({ name: "groceryLists" });
        });
    },
    fetchListItems(listId) {
      var totalp = 0;

      var shoppingLists = [];
      let listsRef = db.collection("shopping_lists");
      let query = listsRef
        .doc(listId)
        .get()
        .then(doc => {
          var messengerID;
          if (doc.empty) {
            shoppingLists = [];
            console.log("No matching documents.");
            return;
          } else {
            if (doc.data().messengerID) {
              messengerID = doc.data().messengerID;
              console.log("messengerID in fetchList" + messengerID);
            } else {
              messengerID = null;
            }
            var id = doc.id.toString;
            var theDoc = doc.data();
            theDoc.docuID = doc.id;
            theDoc.amnt = theDoc.items.length;
            this.listName = theDoc.listName;
            this.messengerID = messengerID;
            this.amountOfItems = theDoc.amnt;
            theDoc.items.forEach(element => {
              totalp = totalp + element.quantity * element.price;
            });
            this.totalPrice = totalp.toFixed(2);
            listsRef.doc(listId).set(
              {
                list_price: this.totalPrice,
                list_quantity: this.amountOfItems
              },
              { merge: true }
            );
            shoppingLists.push(theDoc.items);
          }
          //Assign to data value
          this.shoppingLists = shoppingLists;
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
    }
  }
};
</script>
<style scoped>
#modify-list {
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
.quantity {
  line-height: 0.8rem;
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
.btn-link:hover {
  text-decoration: none;
}
.btn-link:focus {
  text-decoration: none;
}
</style>
