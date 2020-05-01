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
                  :sort-options="{
                    enabled: true,
                    initialSortBy: [
                      { field: 'status', type: 'asc' },
                      { field: 'filter_date', type: 'desc' }
                    ]
                  }"
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
        },
        {
          label: "filter_time",
          field: "filter_time",
          hidden: true
        },
        {
          label: "filter_date",
          field: "filter_date",
          hidden: true
        }
      ],
      orders: []
    };
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      this.currentUser = firebaseApp.auth().currentUser;
    }
    this.getDeliveryInfo();
    this.getPickupInfo();
  },
  methods: {
    getDeliveryInfo: function() {
      axios
        .get(
          "https://supermarketmock-api.herokuapp.com/api/delivery/all/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(response => {
          var type = "Delivery";
          var arrayOfOrders = response.data;
          this.filterOrders(arrayOfOrders, type);
        });
    },
    getPickupInfo: function() {
      axios
        .get(
          "https://supermarketmock-api.herokuapp.com/api/pickup/all/customer/" +
            sessionStorage.getItem("storeId")
        )
        .then(response => {
          var type = "Pickup";
          var arrayOfOrders = response.data;
          this.filterOrders(arrayOfOrders, type);
        });
    },
    filterOrders: function(arrayOfOrders, type) {
      console.log(arrayOfOrders);
      var currentdate = new Date();
      var time, date, combinedTimeStamp, orderStatus;
      arrayOfOrders.forEach(obj => {
        if (type == "Delivery") {
          time = obj.delivery_time;
          date = new Date(obj.delivery_date).toLocaleDateString();
          obj.order_type = `Delivery
                          <i class="fas fa-truck icon"></i>`;
        } else if (type == "Pickup") {
          time = obj.pickup_time;
          date = new Date(obj.pickup_date).toLocaleDateString();
          obj.order_type = `Collection
                          <i class="fas fa-shopping-basket"></i>`;
        }
        combinedTimeStamp = time + " " + date;
        obj.filter_time = time;
        obj.filter_date = date;

        orderStatus =
          new Date(combinedTimeStamp).getTime() > currentdate.getTime();
        obj.delivery_schedule = moment(combinedTimeStamp).format(
          "MMMM Do YYYY [at] h:mm a"
        );

        if (orderStatus) {
          obj.status = `<i class="order-status text-warning fas fa-circle fa-2x" style="font-size: 0.6rem;"></i><span class=" ">
                        In Progress`;
        } else if (!orderStatus && type == "Pickup") {
          obj.status = `<span class="order-status text-success">✔</span>
                          Collected`;
        } else if (!orderStatus && type == "Delivery") {
          obj.status = `<span class="order-status text-success">✔</span>
                          Delivered`;
        }

        this.orders.push(obj);
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

.order-status {
  font-size: 30px;
  margin: 2px 2px 0 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}
.vgt-table thead th {
  color: #333333;
  background: #fff;
}
table.vgt-table {
  font-size: 18px;
  border-collapse: collapse;
  background-color: #fff;
  width: 100%;
  max-width: 100%;
  table-layout: auto;
  border: 0cm;
}
</style>
