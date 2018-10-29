import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import './styles.scss';

@Component({
  template: require('./SinglePerson.html'),
  components: {
    DataTable,
    LoadingIndicator
  }
})

export class SinglePersonContainer extends Vue {
  entityId: string = '';
  errorMsg: string = '';
  isFetching: boolean = false;
  firstName: string = '';
  lastName: string = '';
  company: string = '';
  clientId: string = '';
  phone: string = '';
  email: string = '';
  
  mounted() {
    this.entityId = this.$route.params.id;
    this.getPersonInfo();
  }

  async getPersonInfo() {
    this.isFetching = true;
    const personInfo = await this.$store.dispatch(MutationTypes.GET_PERSON_INFO_REQUEST, { entity_id: this.entityId });
    if (personInfo.status === 'error') {
      this.errorMsg = personInfo.msg;
    }

    this.firstName = personInfo.data.first_name;
    this.lastName = personInfo.data.last_name;
    this.company = personInfo.data.company_name;
    this.clientId = personInfo.data.client_id;
    this.phone = personInfo.data.phone;
    this.email = personInfo.data.email;

    this.isFetching = false;
  }
}