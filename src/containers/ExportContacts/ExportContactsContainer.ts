import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ExportToCsv } from 'export-to-csv';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable'

import './style.scss';

@Component({
  template: require('./ExportContacts.html'),
  components: {
    DataTable
  }
})

export class ExportContactsContainer extends Vue {

  contactColumns = [];
  contactData = [];
  error = '';
  
  mounted() {
    this.$store.dispatch(MutationTypes.EXPORT_CONTACTS_REQUEST, {payload: {}, callback: (res) => {
      if (res.status === 'ok') {
        this.contactColumns = res.data.payload.columns_display.map(label => ({
          label,
          filterable: true,
          align: 'center'
        }));
        res.data.payload.columns_keys.forEach((key, index) => {
          this.contactColumns[index]['field'] = key;
        });
        this.contactData = res.data.payload.data;
        this.error = '';
      } else {
        this.error = res.msg;
      }
    }});
  }

  onDownloadAsCSV() {
    if (this.contactData.length === 0) return;
    const options = {
      filename: 'Contacts',
      showLabels: true,
      headers: this.contactColumns.map(column => column.label),
    };
    const fields = this.contactColumns.map(column => column.field);
    const csvData = this.contactData.map((contact) => {
      const row = [];
      fields.forEach(field => row.push(contact[field] || ''));
      return row;
    });
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(csvData);
  }
}
