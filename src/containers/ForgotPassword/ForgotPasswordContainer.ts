import Vue from 'vue';
import { MutationTypes } from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as _ from 'lodash';

import './styles.scss';

library.add(faCheck)

@Component({
  template: require('./ForgotPassword.html'),
  components: {
    FontAwesomeIcon
  }
})
export class ForgotPasswordContainer extends Vue {
  step: number = 0;
  userData: any = {};
  error: any = {};
  isBusy: boolean = false;

  async forgotPassword() {
    // Form Validation
    this.error = {};
    if (!this.userData.username) this.error.username = 'Please input your username.';
    if (!_.isEmpty(this.error)) return;
    
    // Forgot password
    this.isBusy = true;
    const forgotPasswordResponse = await this.$store.dispatch(MutationTypes.FORGOT_PASSWORD_REQUEST, { username: this.userData.username });
    if (forgotPasswordResponse.status === 'error') {
      this.error.response = forgotPasswordResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    this.step = 1;
    this.isBusy = false;
  }

  async resetPassword() {
    // Form Validation
    this.error = {};
    if (!this.userData.code) this.error.code = 'Please input the confirmation code.';
    if (!this.userData.newPassword) this.error.newPassword = 'Please input new password.';
    if (this.userData.newPassword !== this.userData.confirmPassword) this.error.confirmPassword = 'Password does not match.';
    if (!_.isEmpty(this.error)) return;

    // Reset password
    this.isBusy = true;
    const confirmPasswordResponse = await this.$store.dispatch(MutationTypes.CONFIRM_PASSWORD_REQUEST, {
      username: this.userData.username,
      code: this.userData.code,
      newPassword: this.userData.newPassword,
    });
    if (confirmPasswordResponse.status === 'error') {
      this.error.response = confirmPasswordResponse.msg;
      this.error = { ...this.error };
      this.isBusy = false;
      return;
    }
    this.step = 2;
    this.isBusy = false;
  }
}
