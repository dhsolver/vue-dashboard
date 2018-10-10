import Vue from 'vue';
import VueRouter from 'vue-router';

// conatiners
import { AppContainer } from '../containers/App';
import { FormContainer } from '../containers/Form';
import { DashboardContainer } from '../containers/Dashboard';
import { AdminContainer } from '../containers/Admin';
import { RegisterContainer } from '../containers/Register';
import { LoginContainer } from '../containers/Login';


// register the plugin
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      component: AppContainer,
      name: 'app',
      path: '/',
      meta: { requiresAuth: true },
      children: [
        {
          component: DashboardContainer,
          name: 'dashboard',
          path: '/dashboard',
          alias: '/',
          meta: { requiresAuth: true }
        }, {
          component: FormContainer,
          name: 'form',
          path: '/form',
          meta: { requiresAuth: true }
        }, {
          component: AdminContainer,
          name: 'settings',
          path: '/settings',
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      component: RegisterContainer,
      name: 'register',
      path: '/register',
    },
    {
      component: LoginContainer,
      name: 'login',
      path: '/login',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('awsConfig')) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
