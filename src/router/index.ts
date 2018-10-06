import Vue from 'vue';
import VueRouter from 'vue-router';

// conatiners
import { AppContainer } from '../components/containers/App';
import { FormContainer } from '../components/containers/Form';
import { DashboardContainer } from '../components/containers/Dashboard';
import { AdminContainer } from '../components/containers/Admin';
import { RegisterContainer } from '../components/containers/Register';
import { LoginContainer } from '../components/containers/Login';


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
          meta: { requiresAuth: true }
        }, {
          component: FormContainer,
          name: 'form',
          path: '/form',
          meta: { requiresAuth: true }
        }, {
          component: AdminContainer,
          name: 'admin',
          path: '/admin',
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
