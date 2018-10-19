import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueStripeCheckout from 'vue-stripe-checkout';
import router from './router';
import store from './store';
 // import styles
import './styles/main.scss';

Vue.use(VueStripeCheckout, {
  key: 'pk_test_wXbXkFvn5o3ijJvCCWD1iiLW',
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
