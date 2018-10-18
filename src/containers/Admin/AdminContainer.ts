import Vue from 'vue';
import {MutationTypes} from '../../store/mutation-types';
import { Component, Prop, Model, Watch } from 'vue-property-decorator'

import './style.scss';

@Component({
  template: require('./admin.html'),
  components: {
  }
})
export class AdminContainer extends Vue {
  firstName = '';
  lastName = '';
  company = '';
  clientId = '';
  phone = '';
  email = '';
  isFetching = false;
  errorMsg = '';
  mounted() {
    this.isFetching = true;
    this.getPersonInfo();
  }

  private getPersonInfo() {
    this.$store.dispatch(MutationTypes.GET_PERSON_INFO, { payload: {}, callback: res => {
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

      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);
    }});
  }
}
