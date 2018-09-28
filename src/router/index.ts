import Vue from 'vue';
import VueRouter from 'vue-router';

// conatiners
import { AppContainer } from '../components/containers/App';
import { FormContainer } from '../components/containers/Form';
import { DashboardContainer } from '../components/containers/Dashboard';
import { AdminContainer } from '../components/containers/Admin';
// import { D3Container } from '../components/containers/d3';
import { StripeContainer } from '../components/containers/Stripe';

// modules
import { Navbar } from '../components/modules/Navbar';



// register the plugin
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      component: DashboardContainer,
      name: 'index',
      path: '/',
    }, {
      component: FormContainer,
      name: 'form',
      path: '/form',
    },
    {
      component: AdminContainer,
      name: 'admin',
      path: '/admin',
    },
    // {
    //   component: D3Container,
    //   name: 'd3',
    //   path: '/d3',
    // },
    // {
    //   component: StripeContainer,
    //   name: 'stripe',
    //   path: '/stripe',
    // },
  ],
});

export default router;
