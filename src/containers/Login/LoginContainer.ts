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
  error = '';
  @Getter('loginStorage', {}) loginStorage!: any;
  @Getter('loggedIn', {}) loggedIn!: any;
  @Getter('loginError') loginError!: string;

  @Watch('loggedIn') loggedInChanged(value, oldValue) {
    if (value && !oldValue) {
      if (sessionStorage.getItem('firstLogin') == null) {
        this.createAccount();
        router.push('/create-campaign');
        sessionStorage.setItem('firstLogin', 'no');
      }
      else {
        router.push('dashboard');
      }
    }
  }
  @Watch('loginError') loginErrorChanged(value, oldValue) {
    this.error = value;
  }
  userLogin() {
    this.userNameValidated = this.userName !== '';
    this.passwordValidated = this.password !== '';
    if (this.userNameValidated && this.passwordValidated) {
      const loginInfo = { username: this.userName, password: this.password };
      this.$store.dispatch(MutationTypes.LOGIN_USER, loginInfo);
    }
  }
  userLogout() {
    this.$store.dispatch(MutationTypes.LOGOUT_USER);
  }

  createAccount() {
    const accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
    this.$store.dispatch(MutationTypes.CREATE_ACCOUNT, { payload: accountInfo, callback: (res) => {
      if (res.status == 'ok') {
        console.log('Account has been created successfully.');
      }
      else {
        console.log(res.msg);
      }
    }});
  }
}
