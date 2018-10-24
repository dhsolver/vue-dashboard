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
  firstNameValidated: boolean = true;
  lastNameValidated: boolean = true;

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

  updateUserInfo() {
    this.firstNameValidated = !!this.firstName;
    this.lastNameValidated = !!this.lastName;
    if (this.firstNameValidated && this.lastNameValidated) {
      const personData = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        client_id: this.clientId,
        company: this.company
      };
      console.log(personData);
      // this.$store.dispatch(MutationTypes.UPDATE_PERSON_INFO, { payload: personData, callback: (res) => {
      //   if (res.status === 'ok') {
          
      //   } else {
          
      //   }
      // }});
    }
  }
}
