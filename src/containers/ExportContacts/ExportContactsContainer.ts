import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ExportToCsv } from 'export-to-csv';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import './style.scss';

@Component({
  template: require('./ExportContacts.html'),
  components: {
    DataTable,
    LoadingIndicator,
  }
})
export class ExportContactsContainer extends Vue {

  contactColumns = [];
  contactData = [];
  error: string = '';
  isBusy: boolean = false;
  
  mounted() {
    this.getContacts();
  }

  async getContacts() {
    this.isBusy = true;
    const exportContactsResponse = await this.$store.dispatch(MutationTypes.EXPORT_CONTACTS_REQUEST, {});
    if (exportContactsResponse.status === 'error') {
      this.error = exportContactsResponse.msg;
      this.isBusy = false;
      return;
    }
    this.contactColumns = exportContactsResponse.payload.columns_display.map(label => ({
      label,
      filterable: true,
      align: 'center'
    }));
    exportContactsResponse.payload.columns_keys.forEach((key, index) => {
      this.contactColumns[index]['field'] = key;
    });
    this.contactData = exportContactsResponse.payload.data;
    this.error = '';
    this.isBusy = false;
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

  onSelectContactRow(row) {
    // open single person page when click row.
    const singlePageRouteData = this.$router.resolve({ name: 'single-entity', params: { id: row.id } });
    window.open(singlePageRouteData.href, '_blank');
  }
}
