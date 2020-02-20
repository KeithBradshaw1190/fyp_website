import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebaseApp from './firebaseInit'
Vue.config.productionTip = false

let app;
firebaseApp.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});