import Vue from 'vue';
import { MutationTypes } from '../../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import store from '../../../store';

library.add(faCheck)

@Component({
  template: require('./login.html'),
  components: {
    FontAwesomeIcon
  }
})
export class LoginContainer extends Vue {
  userName = '';
  userNameValidated = true;
  password = '';
  passwordValidated = true;
  @Getter('loginStorage', {}) loginStorage!: any;
  @Getter('loggedIn', {}) loggedIn!: any;

  @Watch('loggedIn') loggedInChanged(value, oldValue) {
    console.log('loggedIn changed');
  }

  userLogin() {
    this.userNameValidated = this.userName !== '';
    this.passwordValidated = this.password !== '';
    if (this.userNameValidated && this.passwordValidated) {
      console.log('sending request...');
      const loginInfo = { username: this.userName, password: this.password };
      this.$store.dispatch(MutationTypes.LOGIN_USER, loginInfo);
    }
  }
  userLogout() {
    this.$store.dispatch(MutationTypes.LOGOUT_USER);
  }
}
