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
              <hr />
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
              </div>
            </div>
          </div>
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
                          Expiry Date
                          <small>(Optional)</small>
                        </label>
                        <input
                          type="text"
                          class="form-control border-input"
                          placeholder="Date"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <button
                      type="submit"
                      @click="addToList"
                      class="btn btn-secondary btn-fill btn-wd"
                      id="btnCreateList"
                    >
                      Add Product
                    </button>
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
import { fb } from "../firebaseInit";
import router from "../router";
import Sidebar from "./Sidebar";
import AutoCompleteSearch from "./AutoCompleteSearch";
import axios from "axios";
const db = fb.firestore();

export default {
  name: "modify-list",
  components: {
    Sidebar,
    AutoCompleteSearch
  },
  data() {
    return {
      currentUser: false,
      placeHolderInputText: "Search for a Product",
      autoCompleteResult: [],
      autoCompleteProgress: false,
      autoCompleteText: "name",
      autoCompleteFieldId: "price",
      autoCompleteImage: "image",
      productList: {},
      listName: "",
      quantity: null,
      listId: null
    };
  },
  created() {
    if (fb.auth().currentUser) {
      this.currentUser = fb.auth().currentUser;
    }
    this.listId = this.$route.params.id;

    console.log(this.listId);
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
    addToList() {
      //Check that all inputs have values
      //Get id from url
      //Add product to items in that doc collection
      // this.db.collection('users').doc().set(Object.assign({}, user))

      //let admin = require("firebase-admin");
      if (this.productList != null) {
        this.productList.quantity = this.quantity;

        var listRef = db.collection("shopping_lists").doc(this.listId);
        var plist = this.productList;

        let transaction = db
          .runTransaction(t => {
            return t.get(listRef).then(doc => {
              console.log(doc.data().items);
              // Add one person to the city population.
              // Note: this could be done without a transaction
              //       by updating the population using FieldValue.increment()
              var newItems = doc.data().items.concat(this.productList);
              console.log(newItems);
              t.update(listRef, { items: newItems });
            });
          })
          .then(result => {
            console.log("Transaction success!");
          })
          .catch(err => {
            console.log("Transaction failure:", err);
          });

        //   listRef
        //     .set({
        //       items: admin.firestore.FieldValue.arrayUnion(plist, {
        //         merge: true
        //       })
        //     })
        //     .then(() => {
        //       console.log("Added");
        //     });
        // } else {
        //   console.log("Product list is null");
        // }
      } else {
        console.log("problem");
      }
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
