import Vue from 'vue';
import VueRouter from 'vue-router';

// conatiners
import { FormContainer } from '../components/containers/Form';
import { DashboardContainer } from '../components/containers/Dashboard';
import { AdminContainer } from '../components/containers/Admin';
import { RegisterContainer } from '../components/containers/Register';



// register the plugin
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      component: DashboardContainer,
      name: 'dashboard',
      path: '/',
    }, {
      component: FormContainer,
      name: 'form',
      path: '/form',
    }, {
      component: AdminContainer,
      name: 'admin',
      path: '/admin',
    }, {
      component: RegisterContainer,
      name: 'register',
      path: '/register',
    },
  ],
});

export default router;
