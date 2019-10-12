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
} from './firebaseInit.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/grocery-dashboard',
      name: 'groceryDashboard',
      component: GroceryDashboard,
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '/verify-details',
          name: 'verifyDetails',
          component: VerifyDetails
        },
        {
          path: '/add-dashboard',
          name: 'addGrocery',
          component: AddGrocery
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
});
export default router;