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
            <div
              v-for="list in shoppingLists"
              v-bind:key="list.docuID"
              v-bind:id="'accordian'+list.docuID"
            >
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link list-title"
                      data-toggle="collapse"
                      v-bind:data-target="'#'+list.docuID"
                      aria-expanded="true"
                      v-bind:aria-controls="list.docuID"
                    >
                      <h4 class="listName">
                        {{ list.listName}}
                        <span
                          class="badge badge-secondary itemsCount"
                        >{{ list.amnt}} Items</span>
                      </h4>
                    </button>
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

                      <!-- <i class="fa fa-edit"></i> Edit List -->
                      <!-- </button> -->
                    </div>

                    <div class="row">
                      <div class="list-group col-lg-12">
                        <div class="row">
                          <div
                            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 p-3"
                            v-for="(name, index) in list.items"
                            v-bind:key="index"
                          >
                            <div href class="list-group-item">
                              <div class="flex-column">
                                {{ name.name }}
                                <!-- <p>
                                <small>by Kelloggs</small>
                                </p>-->
                                <div class>
                                  <p class="d-inline badge">Price: €{{ name.price }}</p>
                                  <span
                                    class="d-inline badge badge-light badge-pill"
                                  >Amount Needed: {{ name.quantity }}</span>
                                </div>
                              </div>
                              <div class="image-parent">
                                <img v-bind:src="name.img" class="img-fluid" alt="quixote" />
                              </div>
                            </div>
                          </div>
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
import { fb } from "../firebaseInit";
import Sidebar from "./Sidebar";
const db = fb.firestore();

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
    if (fb.auth().currentUser) {
      this.currentUser = fb.auth().currentUser;
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
  font-size: 0.8rem;
}
a {
  color: inherit;
  text-decoration: none;
  font: inherit;
}
</style>
