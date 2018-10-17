import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MutationTypes } from '../../store/mutation-types';

import './style.scss';

@Component({
  template: require('./ExportContacts.html'),
  components: {

  }
})

export class ExportContactsContainer extends Vue {
  contacts = [];
  headers = [];
  status = '';
  error = '';

  mounted() {
    /* -- 
    this.$store.dispatch(MutationTypes.EXPORT_CONTACTS, {payload: {}, callback: (res) => {
      if (res.status === 'ok') {
        this.contacts = res.contactInfo.data;
        this.headers = res.contactInfo.columns;
      } else {
        this.status = 'error';
        this.error = res.msg;
      }
    }});
    -- */
  }
}
