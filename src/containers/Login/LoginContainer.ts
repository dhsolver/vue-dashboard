import Vue from 'vue';
import { MutationTypes } from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as _ from 'lodash';

import { Footbar } from '../../components/Footbar';

import './styles.scss';

declare function clearStorage();

library.add(faCheck);

@Component({
  template: require('./login.html'),
  components: {
    FontAwesomeIcon,
    'mainfooter': Footbar
  }
})
export class LoginContainer extends Vue {
  userData: any = {};
  error: any = {};
  isBusy: boolean = false;

  async login() {
    // Form Validation
    this.error = {};
    if (!this.userData.username) this.error.username = 'Please input your username.';
    if (!this.userData.password) this.error.password = 'Please input the password.';
    if (!_.isEmpty(this.error)) return;
    
    // Login user
    this.isBusy = true;
    const loginUserResponse = await this.$store.dispatch(MutationTypes.LOGIN_USER_REQUEST, this.userData);
    if (loginUserResponse.status === 'error') {
      this.error.response = loginUserResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    if (localStorage.getItem('firstLogin') === null) {
      const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
      if (accountInfo) {
        this.createAccount();
      } else {
        this.getPersonInfo('/create-campaign');
      }
      localStorage.setItem('firstLogin', 'no');
    } else {
      this.getPersonInfo('/dashboard');
    }
  }

  async createAccount() {
    const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
    const createAccountResponse = await this.$store.dispatch(MutationTypes.CREATE_ACCOUNT_REQUEST, accountInfo);
    if (createAccountResponse.status === 'error') {
      this.error.response = createAccountResponse.msg;
      this.error = { ...this.error };
      clearStorage();
      this.isBusy = false;
      return;
    }
    this.getPersonInfo('/create-campaign');
  }

  async getPersonInfo(routeName) {
    const getPersonInfoResponse = await this.$store.dispatch(MutationTypes.GET_PERSON_INFO_REQUEST, {});
    if (getPersonInfoResponse.status === 'error') {
      this.error.response = getPersonInfoResponse.msg;
      this.error = { ...this.error };
      clearStorage();
      this.isBusy = false;
      return;
    }
    localStorage.setItem('personInfo', JSON.stringify(getPersonInfoResponse.data));
    this.$router.replace(routeName);
    this.isBusy = false;
  }
}
