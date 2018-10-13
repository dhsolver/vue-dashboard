import Vue from 'vue';
import { Component } from 'vue-property-decorator'

import './styles.scss';

declare function registeringWithCode (code);
declare function registeringRequest (email, pw);

@Component({
  template: require('./register.html'),
  components: {
  }

})
export class RegisterContainer extends Vue {
  email: string = '';
  emailValidated: boolean = true;
  password: string = '';
  passwordConfirm: string = '';
  passwordValidated: boolean = true;

  step: number = 0;
  code: string = '';
  codeValidated: boolean = true;

  userRegister() {
    this.passwordValidated = (this.passwordConfirm === this.password) && (this.password !== '');
    if (this.passwordValidated) {
      registeringRequest(this.email, this.password);
    }
  }

  registeringRequestSent () {
    this.step = 1;
  }

  confirmCode() {
    registeringWithCode(this.code);
  }

  registeringSuccess() {
    this.step = 2;
  }

  changeStep() {
    this.step = 1;
  }

}
