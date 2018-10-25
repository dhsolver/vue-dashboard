import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Link } from './link';
import { MutationTypes } from '../../store/mutation-types';

@Component({
  template: require('./navbar.html')
})
export class Navbar extends Vue {
  inverted: boolean = true;
  username = '';
  clientName = '';
  links: Link[] = [
    new Link('Home', '/'),
    new Link('Counter', '/counter'),
    new Link('List', '/list')
  ];

  mounted() {
    this.username = localStorage.getItem('email');
    this.clientName = localStorage.getItem('clientName');
  }

  logout() {
    this.$store.dispatch(MutationTypes.LOGOUT_USER_REQUEST);
    this.$router.replace('/login');
  }
}
