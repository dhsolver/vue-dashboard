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
    this.getPersonInfo();
  }

  async getPersonInfo() {
    this.isFetching = true;
    const getPersonInfoResponse = await this.$store.dispatch(MutationTypes.GET_PERSON_INFO_REQUEST, {});
    if (getPersonInfoResponse.status === 'error') {
      this.errorMsg = getPersonInfoResponse.msg;
      this.isFetching = false;
      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);
      return;
    }
    const personInfo = getPersonInfoResponse.data;
    this.firstName = personInfo.first_name;
    this.lastName = personInfo.last_name;
    this.company = personInfo.company_name;
    this.clientId = personInfo.client_id;
    this.phone = personInfo.phone;
    this.email = personInfo.email;
    this.isFetching = false;
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
      // this.$store.dispatch(MutationTypes.UPDATE_PERSON_INFO_REQUEST, { payload: personData, callback: (res) => {
      //   if (res.status === 'ok') {
          
      //   } else {
          
      //   }
      // }});
    }
  }
}
