<template>
  <div id="allOrders" class="container-fluid bg-light">
    <div class="row">
      <Sidebar />
      <div class="col-md-6 ml-sm-auto col-lg-9 pt-4 pl-4">
        <div class="container">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1 mb-3 border-bottom"
          >
            <h1 class="h2">All Orders</h1>
          </div>
          <div class="container">
            <div class="card">
              <div class="card-body">
                <vue-good-table
                  :columns="columns"
                  :rows="orders"
                  styleClass="vgt-table"
                  :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'bottom',
                    perPageDropdown: [5, 10, 15],
                    dropdownAllowAll: false,
                    setCurrentPage: 1,
                    nextLabel: 'next',
                    prevLabel: 'prev',
                    rowsPerPageLabel: 'Rows per page',
                    ofLabel: 'of',
                    pageLabel: 'page', // for 'pages' mode
                    allLabel: 'All'
                  }"
                />
                <!-- <div class="table-responsive">
                  <table id="myTable" class="display table table-hover">
                    <thead class="thead">
                      <tr>
                        <th scope="col">Order Type</th>
                        <th scope="col">List Ordered</th>
                        <th scope="col">Schedule Details</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="order in orders" :key="order._id">
                        <th scope="row">
                          Delivery
                          <i class="fas fa-truck icon"></i>
                        </th>
                        <td>{{ order.list_name }}</td>
                        <td>
                          Delivery on {{ order.delivery_date }} at
                          {{ order.delivery_time }}
                        </td>
                        <td>€ {{ order.order_price }}</td>
                        <td>
                          <span class="order-status text-success">✔</span>
                          Delivered
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseInit";
import Sidebar from "./Sidebar";
import axios from "axios";
// import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import moment from "moment";
const db = firebaseApp.firestore();

export default {
  name: "allorders",
  components: {
    Sidebar,
    VueGoodTable,
    moment
  },
  data() {
    return {
      currentUser: false,
      shoppingLists: [],
      columns: [
        {
          label: "Order Type",
          field: "order_type",
          html: true
        },
        {
          label: "List Ordered",
          field: "list_name"
        },
        {
          label: "Schedule Details",
          field: "delivery_schedule"
        },
        {
          label: "Cost",
          field: "order_price"
        },
        {
          label: "Status",
          field: "status",
          html: true
        }
      ],
      orders: []
    };
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      this.currentUser = firebaseApp.auth().currentUser;
    }
    this.getTableInfo();
  },
  methods: {
    getTableInfo: function() {
      axios
        .get(
          "https://supermarketmock-api.herokuapp.com/api/delivery/all/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(response => {
          //console.log(response);
          var currentdate = new Date();
          var dTime, dDate, combinedTimeStamp, orderStatus;
          var arrayOfOrders = response.data;
          arrayOfOrders.forEach(obj => {
            dTime = obj.delivery_time;
            dDate = new Date(obj.delivery_date).toLocaleDateString();
            combinedTimeStamp = dTime + " " + dDate;

            orderStatus =
              new Date(combinedTimeStamp).getTime() > currentdate.getTime();

            if (orderStatus) {
              obj.status = `<i class="order-status text-warning fas fa-circle fa-2x" style="font-size: 0.6rem;"></i><span class=" ">
                        In Progress`;
            } else if (!orderStatus) {
              obj.status = `<span class="order-status text-success">✔</span>
                          Delivered`;
            }
            obj.delivery_schedule =moment(combinedTimeStamp).format('MMMM Do YYYY [at] h:mm a');
            

            obj.order_type = `Delivery
                          <i class="fas fa-truck icon"></i>`;
            this.orders.push(obj);
          });
        });
    }
  }
};
</script>
<style scoped>
#allOrders {
  height: 100%;
  min-height: 100%;
  background-color: #f8f9fa !important;
}
body {
  margin-top: 20px;
  background-color: #f8f9fa !important;
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

.list-title {
  padding-bottom: 0;
  margin-bottom: 0;
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

table.table .icon {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
.order-status {
  font-size: 30px;
  margin: 2px 2px 0 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 0;
}
</style>
