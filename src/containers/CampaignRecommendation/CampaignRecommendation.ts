import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { ExportToCsv } from 'export-to-csv';
import { MutationTypes } from '../../store/mutation-types';
import { DataTable } from '../../components/DataTable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import './styles.scss';

declare function getSubjectId();

@Component({
  template: require('./CampaignRecommendation.html'),
  components: {
    DataTable,
    LoadingIndicator,
  },
  data: function() {
    return {
      subjectId: getSubjectId(),
      adopt_curve_x: '',
      adopt_curve_y: '',
      adopt_curve_limit: 'top_1000',
      adopt_curve_x_options: [],
      adopt_curve_y_options: [],
      adopt_curve_limit_options: [],
    };
  },

  created() {

    function formatOptions(corpora) {
      const rv = [];
      corpora.forEach(function (corpus) {
        rv.push(
          { 'value': corpus[0], 'text': corpus[1], }
        );
      });
      return rv;
    }

    this.$store.dispatch(MutationTypes.GET_CORPORA_REQUEST, {
      payload: {}, callback: res => {
        const corpora = res.data['client_corpora'].concat(res.data['wrench_corpora'], res.data['common_corpora']);
        const dropdownValues = formatOptions(corpora);
        this.$data.adopt_curve_x_options = dropdownValues;
        this.$data.adopt_curve_y_options = dropdownValues;
      }
    });

    this.$store.dispatch(MutationTypes.GET_CLIENT_FILE_FILTERS_REQUEST, {
      payload: {}, callback: res => {
        const filters = res.data;
        const dropdownValues = formatOptions(filters);
        this.$data.adopt_curve_limit_options = dropdownValues;
      }
    });
  }
})

export class CampaignRecommendationContainer extends Vue {
  contactColumns = [];
  contactData = [];
  error: string = '';
  isBusy: boolean = false;

  async getContacts() {
    if (this.$data.adopt_curve_x !== '' && this.$data.adopt_curve_y !== '') {
      this.isBusy = true;

      const contactParams = {
        campaign_recommendation: 'prelaunch_camp_feedback',
        x: this.$data.adopt_curve_x,
        y: this.$data.adopt_curve_y,
        filter: this.$data.adopt_curve_limit
      }
      /* --- API is not ready ---
      const exportContactsResponse = await this.$store.dispatch(MutationTypes.EXPORT_CONTACTS_REQUEST, contactParams);
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
      */
      this.error = '';
      this.isBusy = false;
    }
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
