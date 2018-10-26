import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Link } from './link';
import { MutationTypes } from '../../store/mutation-types';

@Component({
  template: require('./navbar.html')
})
export class Navbar extends Vue {
  inverted: boolean = true;
  userName = '';
  companyName = '';
  links: Link[] = [
    new Link('Home', '/'),
    new Link('Counter', '/counter'),
    new Link('List', '/list')
  ];

  mounted() {
    const personInfo = JSON.parse(localStorage.getItem('personInfo'));
    this.userName = `${personInfo.first_name} ${personInfo.last_name}`;
    this.companyName = personInfo.company_name;
  }

  logout() {
    this.$store.dispatch(MutationTypes.LOGOUT_USER_REQUEST);
    this.$router.replace('/login');
  }
}
