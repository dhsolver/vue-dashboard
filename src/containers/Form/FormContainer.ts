import Vue from 'vue';
import { MutationTypes } from '../../store/mutation-types';
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class';

import MultipleFileUploader from '@updivision/vue2-multi-uploader'
import Datepicker from 'vuejs-datepicker';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../../router';
import store from '../../store';

import './styles.scss';

library.add(faCheck)

@Component({
  template: require('./form.html'),
  components: {
    MultipleFileUploader,
    Datepicker,
    FontAwesomeIcon
  }


})


export class FormContainer extends Vue {

  step = 2;
  formValidated = [];

  userName = '';
  userNameValidated = true;
  password = '';
  passwordValidated = true;


  // FILL OUT YOUR CONTACT INFO
  firstName = '';
  firstNameValidated = true;
  lastName = '';
  lastNameValidated = true;
  company = '';
  companyValidated = true;
  phoneNumber = '';
  phoneNumberValidated = true;
  email = '';
  emailValidated = true;
  address1 = '';
  addressValidated = true;
  address2 = '';
  birthday = new Date(1980, 1, 1);
  birthdayValidated = true;
  fileUpLoadValidated = false;

  @Getter('loginStorage', {}) loginStorage!: any;
  @Getter('loggedIn', {}) loggedIn!: any;
  @Getter('submittedContactInfo', {}) submittedContactInfo: any;
  @Getter('uploadedFile', {}) uploadedFile: any;

  @Watch('submittedContactInfo') submittedContactInfoChanged(value, oldValue) {
    console.log(this.submittedContactInfo, 'callback api (submit contract)')
    if (this.submittedContactInfo) {
      if (this.step === 1) this.step = 2;
    }
  }

  @Watch('uploadedFile') uploadedFileChanged(value, oldValue) {
    if (this.uploadedFile) {
      if (this.step === 2) this.step = 3;
      this.fileUpLoadValidated = true;
      router.push('form');
    }
  }

  mounted() {
    this.getContactInfo();
  }

  // Login
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

  // COMMON
  getClassNameForTab(tab) {

    let class1 = `wd-step ${this.step === tab ? 'active' : ''}`;
    if (tab === 0) {
      return `${class1} ${this.loggedIn ? 'done ' : ''}`

    } else if (tab === 1) {
      return `${class1} ${this.submittedContactInfo ? 'done ' : ''}`
    }
    return class1;
  }

  nextStep() {
    if (this.validateStep(this.step)) {
      switch (this.step) {
        case 0:
          this.step ++;
        break;
        case 1:
          if (this.submittedContactInfo) {
            this.step++;
          } else {
            this.submitContactInfo();
          }
        break;
        case 2:
          this.step++;
          break;
      }


    }
  }

  setStep(tab) {
    console.log(tab);
    if (this.loggedIn && tab < 3) {
      this.step = tab;
    }
  }

  prevStep() {
    this.step--;
  }

  isDisabledPrevBtn() {
    return this.step <= 0;
  }

  isDisabledNextBtn() {

    return this.step >= 3;
  }

  validateStep(tab) {
    switch (tab) {
      case 0:
        this.formValidated[0] = this.loggedIn;
        return this.formValidated[0];
      case 1:
        this.firstNameValidated = this.firstName !== '';
        this.lastNameValidated = this.lastName !== '';
        this.phoneNumberValidated = this.phoneNumber !== '';
        this.companyValidated = this.company !== '';
        this.emailValidated = this.email !== '';
        this.addressValidated = this.address1 + this.address2 !== '';
        if (this.firstNameValidated &&
          this.lastNameValidated &&
          this.phoneNumberValidated &&
          this.companyValidated &&
          this.emailValidated) {
          this.formValidated[tab] = true;
          return true;
        }
        break;
      case 2:
        if (this.fileUpLoadValidated) {
          return true;
        }
        break;
      default:
    }
    this.formValidated[tab] = false;
    return false;
  }

  private getContactInfo() {
    this.$store.dispatch(MutationTypes.GET_CONTACT_INFO, { callback: contact_info => {
      if (this.loggedIn) {
        this.firstName = contact_info.first_name;
        this.lastName = contact_info.last_name;
        this.email = contact_info.email;
        this.company = contact_info.company;
        this.phoneNumber = contact_info.phone;
        this.address1 = contact_info.street_address_1;
        this.address2 = contact_info.street_address_2;
        this.birthday = contact_info.birthday;
        this.step = 2;
      }
    }});

  }

  private submitContactInfo() {
    let contactInfo = {
      'first_name': this.firstName,
      'last_name': this.lastName,
      'company_name': this.company,
      'phone_number': this.phoneNumber,
      'email': this.email,
      'street_1': '555 Main St.',
      'street_2': 'Apt 2B',
      'city': 'Los Angeles',
      'state': 'CA', 'zip':
        '91203', 'year': '1970',
      'month': '01',
      'day': '21'
    };
    this.$store.dispatch(MutationTypes.SUBMIT_CONTACT_INFO, contactInfo);
  }

  private uploadFile(file: File) {
    this.$store.dispatch(MutationTypes.UPLOAD_FILE, file);
  }
  success_handler(response) {
    console.log(response, 'slfjlksjdfljsfdlkj');
    this.fileUpLoadValidated = false;

  }
  handleFileUpload (fileList) {
    console.log('fileList.length: ' + (fileList.length));
    if (!fileList.length)
      return;
    console.log('fileList[0].type): ' + (fileList[0].type));
    console.log('fileList[0].type.indexOf(\'csv\'): ' + (fileList[0].type.indexOf('csv')));
    console.log('uploading file');
    this.uploadFile(fileList[0]);
  }

}
