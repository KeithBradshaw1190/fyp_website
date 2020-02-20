import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import VerifyDetails from '@/components/VerifyDetails'
import GroceryDashboard from '@/components/GroceryDashboard'
import GroceryLists from '@/components/GroceryLists'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import AddItem from '@/components/AddItem'
import ModifyList from '@/components/ModifyList'

import firebaseApp from './firebaseInit'

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
      path: '/grocerylists/',
      name: 'groceryLists',
      component: GroceryLists,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addItem/',
      name: 'add-item',
      component: AddItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/modifyList/:id',
      name: 'modify-list',
      props: true,
      component: ModifyList,
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
    if (!firebaseApp.auth().currentUser) {
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
    if (firebaseApp.auth().currentUser) {
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