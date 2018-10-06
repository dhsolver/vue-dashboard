import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
 // import styles
import './styles/main.scss';

sync(store, router);

new Vue({
  el: '#page-container',
  store,
  router: router,
});
