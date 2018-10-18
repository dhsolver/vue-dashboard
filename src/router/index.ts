import Vue from 'vue';
import VueRouter from 'vue-router';

// conatiners
import { AppContainer } from '../containers/App';
import { FormContainer } from '../containers/Form';
import { DashboardContainer } from '../containers/Dashboard';
import { AdminContainer } from '../containers/Admin';
import { RegisterContainer } from '../containers/Register';
import { LoginContainer } from '../containers/Login';
import { ForgotPasswordContainer } from '../containers/ForgotPassword';
import { CreateCampaignContainer } from '../containers/CreateCampaign';
import { BillingContainer } from '../containers/Billing';


// register the plugin
Vue.use(VueRouter);

const router = new VueRouter({
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
        },
        {
          component: FormContainer,
          name: 'form',
          path: '/form',
          meta: { requiresAuth: true }
        },
        {
          component: AdminContainer,
          name: 'settings',
          path: '/settings',
          meta: { requiresAuth: true }
        },
        {
          component: CreateCampaignContainer,
          name: 'create-campaign',
          path: '/create-campaign',
          meta: { requiresAuth: true }
        },
        {
          component: BillingContainer,
          name: 'billing',
          path: '/billing',
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
    {
      component: ForgotPasswordContainer,
      name: 'forgot-password',
      path: '/forgot-password',
    },
    {
      path: '*',
      redirect: '/',
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
