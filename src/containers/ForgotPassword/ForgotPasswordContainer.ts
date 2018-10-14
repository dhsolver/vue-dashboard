import Vue from 'vue';
import { MutationTypes } from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../../router';
import store from '../../store';

import './styles.scss';

library.add(faCheck)

@Component({
  template: require('./ForgotPassword.html'),
  components: {
    FontAwesomeIcon
  }
})
export class ForgotPasswordContainer extends Vue {
  username = '';
  usernameValidated = true;
  code = '';
  codeValidated = true;
  newPassword = '';
  newPasswordValidated = true;
  confirmPassword = '';
  confirmPasswordValidated = true;
  @Getter('forgotPasswordStatus') forgotPasswordStatus!: string;
  @Getter('forgotPasswordError') forgotPasswordError!: string;
  @Getter('confirmPasswordStatus') confirmPasswordStatus!: string;
  @Getter('confirmPasswordError') confirmPasswordError!: string;

  forgotPassword() {
    this.usernameValidated = this.username !== '';
    if (this.usernameValidated) {
      const userData = { username: this.username };
      this.$store.dispatch(MutationTypes.FORGOT_PASSWORD_REQUEST, userData);
    }
  }

  resetPassword() {
    this.codeValidated = this.code !== '';
    this.newPasswordValidated = this.newPassword && this.newPassword.length >= 6;
    this.confirmPasswordValidated = this.confirmPassword === this.newPassword;
    if (this.codeValidated && this.newPasswordValidated && this.confirmPasswordValidated) {
      const userData = { username: this.username, code: this.code, newPassword: this.newPassword };
      this.$store.dispatch(MutationTypes.CONFIRM_PASSWORD_REQUEST, userData);
    }
  }
}
