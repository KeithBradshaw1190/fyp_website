import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  fb
} from './firebaseInit'
Vue.config.productionTip = false

let app;
fb.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});