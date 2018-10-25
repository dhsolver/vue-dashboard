import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable'

import './styles.scss';

@Component({
  template: require('./SinglePerson.html'),
  components: {
    DataTable
  }
})

export class SinglePersonContainer extends Vue {
  uId: string = '';
  errorMsg: string = '';
  isFetching: boolean = false;
  firstName: string = '';
  lastName: string = '';
  company: string = '';
  clientId: string = '';
  phone: string = '';
  email: string = '';
  
  mounted() {
    this.uId = this.$route.params.id;
    /*this.$store.dispatch(MutationTypes.GET_PERSON_INFO_REQUEST, { payload: this.uId, callback: res => {
      this.isFetching = false;
      if (res.status === 'success') {
        this.firstName = res.data.first_name;
        this.lastName = res.data.last_name;
        this.company = res.data.company_name;
        this.clientId = res.data.client_id;
        this.phone = res.data.phone;
        this.email = res.data.email;
      }
      else {
        this.errorMsg = res.msg;
      }
    }});*/
    this.firstName = 'Daniel';
    this.lastName = 'Ho';
    this.company = 'D-C';
    this.clientId = 'aaaa-bbbb-cccc-dddd';
    this.phone = '';
    this.email = 'dan1114ho@gmail.com';
  }
}