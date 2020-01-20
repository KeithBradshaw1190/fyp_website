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
            <div id="accordion" class="Slist">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link list-title"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <h4 class="listName">
                        Weekly Shop
                        <span class="badge badge-secondary itemsCount">3 Items</span>
                      </h4>
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <div class id="editBtn">
                      <button type="button" class="btn btn-outline-success btn-circle btn-sm">
                        <i class="fa fa-edit"></i> Edit List
                      </button>
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <ul class="list-group list-group-horizontal">
                          <div
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          >
                            <div class="flex-column">
                              Corn Flakes Cereal
                              <p>
                                <small>by Kelloggs</small>
                              </p>
                              <span class="badge badge-light badge-pill">Amount Needed: 2</span>
                            </div>
                            <div class="image-parent">
                              <img
                                src="https://img.tesco.ie/Groceries/pi/084/5000127014084/IDShot_225x225.jpg"
                                class="img-fluid"
                                alt="quixote"
                              />
                            </div>
                          </div>
                          <a
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          >
                            <div class="flex-column">
                              Avonmore Slimline 1L
                              <p>
                                <small>by Avonmore</small>
                              </p>
                              <span class="badge badge-light badge-pill">Amount Needed: 2</span>
                            </div>
                            <div class="image-parent">
                              <img
                                src="https://img.tesco.ie/Groceries/pi/046/5011056020046/IDShot_225x225.jpg"
                                alt="lay"
                              />
                            </div>
                          </a>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--Accordian end-->

            <div id="accordion" class="Slist">
              <div class="card">
                <div class="card-header" id="headingTwo">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link list-title"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <h4 class="font-bold listName">
                        Monthly Household Items
                        <span
                          class="badge badge-secondary itemsCount"
                        >3 Items</span>
                      </h4>
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseTwo"
                  class="collapse show"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <div class id="editBtn">
                      <button type="button" class="btn btn-outline-success btn-sm">
                        <i class="fa fa-edit"></i> Edit List
                      </button>
                    </div>

                    <div class="row">
                      <div class="col-12">
                        <ul class="list-group list-group-horizontal">
                          <div
                            href="#"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          >
                            <div class="flex-column">
                              Corn Flakes Cereal
                              <p>
                                <small>by Kelloggs</small>
                              </p>
                              <span class="badge badge-light badge-pill">
                                <i class="fa fa-shopping-basket"></i> Amount Needed: 1
                              </span>
                            </div>
                            <div class="image-parent">
                              <img
                                src="https://img.tesco.ie/Groceries/pi/084/5000127014084/IDShot_225x225.jpg"
                                class="img-fluid"
                                alt="quixote"
                              />
                            </div>
                          </div>
                          <a
                            href="#"
                            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          >
                            <div class="flex-column">
                              Avonmore Slimline 1L
                              <p>
                                <small>by Avonmore</small>
                              </p>
                              <span class="badge badge-light badge-pill">
                                <i class="fa fa-shopping-basket"></i> Amount Needed: 2
                              </span>
                            </div>
                            <div class="image-parent">
                              <img
                                src="https://img.tesco.ie/Groceries/pi/046/5011056020046/IDShot_225x225.jpg"
                                alt="lay"
                              />
                            </div>
                          </a>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--Accordian End -->
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
  name: "groceryLists",
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