import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import VerifyDetails from '@/components/VerifyDetails'
import GroceryDashboard from '@/components/GroceryDashboard'
import AddGrocery from '@/components/AddGrocery'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'

import {
  fb
} from './firebaseInit'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/verify-details/',
      name: 'verifyDetails',
      component: VerifyDetails,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/grocery-dashboard/',
      name: 'groceryDashboard',
      component: GroceryDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-dashboard/',
      name: 'addGrocery',
      component: AddGrocery,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        requiresGuest: true
      }
    }
  ]
});

//Navigation Guards

router.beforeEach((to, from, next) => {
  //Check for auth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if Not Logged into FB
    if (!fb.auth().currentUser) {
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //If logged in 
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if  Logged into FB
    if (fb.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //If logged in 
      next();
    }
  } else {
    next();
  }
});
export default router;