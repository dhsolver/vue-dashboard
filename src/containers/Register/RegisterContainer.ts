import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationTypes } from '../../store/mutation-types';
import _ from 'lodash';

import { Footbar } from '../../components/Footbar';

import './styles.scss';

@Component({
  template: require('./register.html'),
  components: {
    'mainfooter': Footbar
  }
})
export class RegisterContainer extends Vue {
  step: number = 0;
  userData: any = {};
  code: string = '';
  error: any = {};
  isBusy: boolean = false;

  termsWindow: any = null;
  dataPolicyWindow: any = null;
  cookieUseWindow: any = null;

  async registerUser() {
    // Form Validation
    this.error = {};
    if (!this.userData.firstName) this.error.firstName = 'Please enter your first name.';
    if (!this.userData.lastName) this.error.lastName = 'Please enter your last name.';
    if (!this.userData.email) this.error.email = 'Please enter your email address.';
    if (!this.userData.company) this.error.company = 'Please enter your company name or ID.';
    if (!this.userData.password) this.error.password = 'Please enter a password.';
    if (this.userData.password !== this.userData.confirmPassword) this.error.confirmPassword = 'Passwords do not match.';
    if (!this.userData.agree) this.error.agree = 'Please confirm that you agreed to our Terms and Policy.';
    if (!_.isEmpty(this.error)) return;
    // Check if company name is used
    this.isBusy = true;
    const getCompanyNameResponse = await this.$store.dispatch(MutationTypes.GET_COMPANY_NAME_REQUEST, { company_name: this.userData.company });
    if (getCompanyNameResponse.status === 'error') {
      this.error.response = getCompanyNameResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    // Register user to cognito
    const registerUserResponse = await this.$store.dispatch(MutationTypes.REGISTER_USER_REQUEST, {
      email: this.userData.email,
      password: this.userData.password,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      company: this.userData.company,
    });
    if (registerUserResponse.status === 'error') {
      this.error.response = registerUserResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    // Store user info to localStorage for creating account
    localStorage.removeItem('firstLogin');
    const accountInfo = {
      email: this.userData.email,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      company: this.userData.company,
    };
    localStorage.setItem('accountInfo', JSON.stringify(accountInfo));
    this.step = 1;
    this.isBusy = false;
  }

  async confirmCode() {
    // Form Validation
    this.error = {};
    if (!this.code) this.error.code = 'Please enter your confirmation code.';
    if (!_.isEmpty(this.error)) return;

    // Confirm user
    this.isBusy = true;
    const confirmUserResponse = await this.$store.dispatch(MutationTypes.CONFIRM_USER_REQUEST, { code: this.code });
    if (confirmUserResponse.status === 'error') {
      this.error.response = confirmUserResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    this.$router.replace('/login');
    this.isBusy = false;
  }

  changeStep() {
    this.error = {};
    this.step = 1;
  }

  openWindow(windowName) {
    switch (windowName) {
      case 'TERMS':
        if (!this.termsWindow || this.termsWindow.closed) {
          this.termsWindow = window.open('https://wrench.ai/terms/');
        } else {
          this.termsWindow.focus();
        }
        break;
      case 'DATA_POLICY':
        if (!this.dataPolicyWindow || this.dataPolicyWindow.closed) {
          this.dataPolicyWindow = window.open('https://wrench.ai/privacy-statement');
        } else {
          this.dataPolicyWindow.focus();
        }
        break;
      case 'COOKIE_USE':
        if (!this.cookieUseWindow || this.cookieUseWindow.closed) {
          this.cookieUseWindow = window.open('https://wrench.ai/privacy-statement');
        } else {
          this.cookieUseWindow.focus();
        }
        break;
      default:
    }
  }
}
