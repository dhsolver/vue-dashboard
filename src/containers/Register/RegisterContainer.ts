import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { MutationTypes } from '../../store/mutation-types';
import router from '../../router';
import store from '../../store';

import './styles.scss';

declare function registeringWithCode (code);
declare function registeringRequest (email, pw, fname, lname, company);

@Component({
  template: require('./register.html'),
  components: {
  }

})
export class RegisterContainer extends Vue {
  firstname: string = '';
  firstnameValidated: boolean = true;
  lastname: string = '';
  lastnameValidated: boolean = true;
  email: string = '';
  emailValidated: boolean = true;
  company = '';
  companyValidated: boolean = true;
  password: string = '';
  passwordConfirm: string = '';
  passwordValidated: boolean = true;
  agree: boolean = false;
  agreeError: string = '';
  codeError: string = '';

  step: number = 0;
  code: string = '';
  codeValidated: boolean = true;

  termsWindow: any = null;
  dataPolicyWindow: any = null;
  cookieUseWindow: any = null;

  userRegister() {
    this.firstnameValidated = this.firstname ? true : false;
    this.lastnameValidated = this.lastname ? true : false;
    this.emailValidated = this.email ? true : false;
    this.companyValidated = this.company ? true : false;
    this.passwordValidated = (this.passwordConfirm === this.password) && (this.password !== '');
    this.agreeError = this.agree ? '' : 'Please confirm that you agreed to our Terms and Policy';
    if (this.firstnameValidated && this.lastnameValidated && this.emailValidated && this.companyValidated && this.passwordValidated && this.agree) {
      registeringRequest(this.email, this.password, this.firstname, this.lastname, this.company);
    }
  }

  registeringRequestSent () {
    this.step = 1;
    this.create_account();
  }

  submitRegisterForm(event) {
    return false;
    event.preventDefault();

  }

  confirmCode() {
    registeringWithCode(this.code).then(() => {
      router.push('login');
    }).catch(err => {
      this.codeError = err;
    });
  }

  registeringSuccess() {
    this.step = 2;
  }

  changeStep() {
    this.step = 1;
  }

  create_account() {
    let accountInfo = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      company: this.company
    };

    const that = this;
    this.$store.dispatch(MutationTypes.CREATE_ACCOUNT, {payload: accountInfo, callback: (res) => {
      if (res.status === 'ok') {
        console.log('success!')
      }
      else {
        console.log('account creation failed.  msg: ' + res.msg)
        this.create_account();
      }
      console.log(res);
      that.step = 1;
    }});
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
