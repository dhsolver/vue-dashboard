import Vue from 'vue';
import {MutationTypes} from '../../store/mutation-types';
import { Component, Prop, Model, Watch } from 'vue-property-decorator'

@Component({
  template: require('./admin.html'),
  components: {
  }
})
export class AdminContainer extends Vue {
  firstName = '';
  lastName = '';
  company = '';
  phone = '';
  email = '';
  isFetching = false;
  mounted() {
    this.isFetching = true;
    this.getPersonInfo();
  }

  private getPersonInfo() {
    this.$store.dispatch(MutationTypes.GET_PERSON_INFO, { payload: { entity_id: 'bd931230-70a4-4fd6-b060-de605a7773b2' }, callback: res => {
      this.isFetching = false;
      if (res.status === 'success') {
        this.firstName = res.data.first_name;
        this.lastName = res.data.last_name;
        this.company = res.data.company;
        this.phone = res.data.phone;
        this.email = res.data.email;
      }
    }});
  }
}
