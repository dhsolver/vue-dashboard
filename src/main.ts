import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueStripeCheckout from 'vue-stripe-checkout';
import router from './router';
import store from './store';
 // import styles
import './styles/main.scss';

Vue.use(VueStripeCheckout, {
  key: 'pk_live_BDO4fvf6STzU68wx7Tx43aG6',
  locale: 'auto',
  currency: 'USD',
  panelLabel: 'Pay {{amount}}',
});

sync(store, router);

new Vue({
  el: '#page-container',
  store,
  router: router,
});
