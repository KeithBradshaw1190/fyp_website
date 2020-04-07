<template>
  <div id="add-grocery" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3 border-bottom"
          >
            <h1 class="h2">Your Grocery Lists</h1>
            <button type="button" to="/addItem" class="btn btn-outline-dark btn-circle btn-sm">
              <i class="fa fa-plus"></i>
              <router-link to="/addItem">Create New List</router-link>
            </button>
          </div>
          <div class="container">
            <!-- Display when no lists -->
            <div v-if="shoppingLists.length==0">
              <div class="card clist">
                <div class="card-block">
                  <div class="row">
                    <div class="col-12">
                      <h5 class="text-center">No Grocery Lists Created</h5>
                      <div class="row justify-content-center">
                        <div class="col-12" style="text-align: center">
                          <i class="fas fa-shopping-cart text-center" style="font-size:3rem;"></i>
                        </div>
                      </div>
                      <div class="text-center">
                        <router-link
                          class="btn btn-dark btn-fill btn-wd p-2 m-2 text-white"
                          to="/addItem"
                        >Create First List</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Display when no lists -->

            <div
              v-for="list in shoppingLists"
              v-bind:key="list.docuID"
              v-bind:id="'accordian'+list.docuID"
              class="listAccordion"
            >
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <button
                      class="d-flex btn btn-link list-title collapsed fullBtn justify-content-center"
                      data-toggle="collapse"
                      v-bind:data-target="'#'+list.docuID"
                      aria-expanded="false"
                      v-bind:aria-controls="list.docuID"
                    >
                      <!-- Title -->
                      <h4 class="font-weight-bold listName mb-0 mt-3">{{ list.listName}}</h4>
                    </button>
                    <p class="mb-2">
                      <i class="fas fa-shopping-basket"></i>
                      {{ list.amnt}} Items
                    </p>
                    <p>Total List Price €{{list.list_price}}</p>
                  </h5>
                </div>

                <div
                  v-bind:id="list.docuID"
                  class="collapse show"
                  v-bind:aria-labelledby="list.docuID"
                  v-bind:data-parent="'#accordian'+list.docuID"
                >
                  <div class="card-body">
                    <div class id="editBtn">
                      <!-- <button type="button" class="btn btn-outline-success btn-circle btn-sm"> -->
                      <router-link
                        tag="span"
                        :to="{ name: 'modify-list', params: { id: list['docuID'] }}"
                        class="btn btn-outline-success btn-circle btn-sm"
                      >
                        <i class="fa fa-edit"></i> Edit List
                      </router-link>
                    </div>

                    <div class="row">
                      <div class="card-group col-lg-12 row">
                        <div
                          class="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-3"
                          v-for="(name, index) in list.items"
                          v-bind:key="index"
                        >
                          <!-- Card -->
                          <div class="card h-100">
                            <!-- Card content -->
                            <div class="card-body">
                              <img class="img-sm float-right" v-bind:src="name.img" />
                              <!-- Title -->
                              <h4 class="card-title">
                                <a>{{ name.name }}</a>
                              </h4>

                              <!-- Info List -->
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                  <a class="btn-floating btn-tw btn-sm">
                                    <i class="fas fa-clipboard-list"></i>
                                  </a>
                                  {{ name.quantity }} Items @ €{{name.price.toFixed(2)}} each
                                </li>
                              </ul>
                              <!-- End of Info List -->
                            </div>
                          </div>
                          <!-- Card -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--Card end-->
            </div>
            <!--Accordian end-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseInit";
import Sidebar from "./Sidebar";
const db = firebaseApp.firestore();

export default {
  name: "groceryLists",
  components: {
    Sidebar
  },
  data() {
    return {
      currentUser: false,
      shoppingLists: []
    };
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      this.currentUser = firebaseApp.auth().currentUser;
    }
    this.getShoppingingLists();
    console.log(this.shoppingLists);
    //Will need to add the shopping list array of objects to a data value
    //from there loop through and display
  },
  methods: {
    getShoppingingLists() {
      var shoppingLists = [];
      let listsRef = db.collection("shopping_lists");
      let query = listsRef
        .where("uid", "==", this.currentUser.uid)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            shoppingLists = null;
            console.log("No matching documents.");
            return;
          }

          snapshot.forEach(doc => {
            var id = doc.id.toString;
            var theDoc = doc.data();
            theDoc.docuID = doc.id;
            theDoc.amnt = theDoc.items.length;
            shoppingLists.push(theDoc);
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
      //Assign to data value
      this.shoppingLists = shoppingLists;
    }
  }
};
</script>
<style scoped>
#add-grocery {
  height: 100%;
  min-height: 100%;
  background-color: #f8f9fa !important;
}
body {
  margin-top: 20px;
  background-color: #f8f9fa !important;
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

.card-header {
  background-color: #ffffff;
  border-bottom: 0;
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
  font-size: 1rem;
}
a {
  color: inherit;
  text-decoration: none;
  font: inherit;
}
.clist {
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
[data-toggle="collapse"] .fa:before {
  content: "\f139";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f13a";
}
/* .listAccordion .card,
.listAccordion .card:last-child .card-header {
  border: none;
} */

.listAccordion .card-header {
  border-bottom-color: #edeff0;
  background: transparent;
}

.listAccordion .fa-stack {
  font-size: 18px;
}

.listAccordion .fullBtn {
  width: 100%;
  font-weight: bold;
  padding: 0;
}

.listAccordion .fullBtn:hover,
.listAccordion .fullBtn:focus {
  text-decoration: none;
}

.listaccordion li + li {
  margin-top: 10px;
}
.chip {
  display: inline-block;
  height: 32px;
  padding: 0 12px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  background-color: #eceff1;
  border-radius: 16px;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.list-group-flush .list-group-item {
  border-top: 0;
}
.list-group-item {
  padding: 0;
}
</style>

