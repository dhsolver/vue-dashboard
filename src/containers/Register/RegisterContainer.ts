import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import router from '../../router';

import './styles.scss';

declare function registeringWithCode (code);
declare function registeringRequest (email, pw, fname, lname);

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
  password: string = '';
  passwordConfirm: string = '';
  passwordValidated: boolean = true;
  agree: boolean = false;
  agreeError: string = '';
  codeError: string = '';

  step: number = 0;
  code: string = '';
  codeValidated: boolean = true;

  userRegister() {
    this.firstnameValidated = this.firstname ? true : false;
    this.lastnameValidated = this.lastname ? true : false;
    this.emailValidated = this.email ? true : false;
    this.passwordValidated = (this.passwordConfirm === this.password) && (this.password !== '');
    this.agreeError = this.agree ? '' : 'Please confirm that you agreed to our Terms and Policy';
    if (this.firstnameValidated && this.lastnameValidated && this.emailValidated && this.passwordValidated && this.agree) {
      registeringRequest(this.email, this.password, this.firstname, this.lastname);
    }
  }

  registeringRequestSent () {
    this.step = 1;
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

}
