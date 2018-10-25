import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {MutationTypes} from '../../store/mutation-types';
import store from '../../store';

import './style.scss';

library.add(faCheck);

declare function getSubjectId();

@Component({
  template: require('./dashboard.html'),
  components: {
    FontAwesomeIcon
  },
  data: function() {
     return {
       subjectId: getSubjectId(),
       adopt_curve_x: '',
       adopt_curve_y: '',
       adopt_curve_limit: '',
       adopt_curve_x_options: [],
       adopt_curve_y_options: [],
       adopt_curve_limit_options: [],
       influencers_x: '',
       influencers_y: '',
       influencers_limit: '',
       influencers_x_options: [],
       influencers_y_options: [],
       influencers_limit_options: []
     };
  },

  created() {

    function formatOptions(corpora) {
        const rv = [];
        corpora.forEach(function(corpus) {
          rv.push(
            { 'value': corpus[0],  'text': corpus[1], }
          );
        });
        return rv;
    }

    const adopCurveLocalX = localStorage.getItem('adopt_curve_x');
    if (adopCurveLocalX) {
      this.$data.adopt_curve_x = adopCurveLocalX;
    }
    const adopCurveLocalY = localStorage.getItem('adopt_curve_y');
    if (adopCurveLocalY) {
      this.$data.adopt_curve_y = adopCurveLocalY;
    }

    const adoptCurveLocalLimit = localStorage.getItem('adopt_curve_limit');
    if (adoptCurveLocalLimit) {
      this.$data.adopt_curve_limit = adoptCurveLocalLimit;
    }

    const influencersLocalX = localStorage.getItem('influencers_x');
    if (influencersLocalX) {
      this.$data.influencers_x = influencersLocalX;
    }
    const influencersLocalY = localStorage.getItem('influencers_y');
    if (influencersLocalY) {
      this.$data.influencers_y = influencersLocalY;
    }

    const influencersLocalLimit = localStorage.getItem('influencers_limit');
    if (influencersLocalLimit) {
      this.$data.influencers_limit = influencersLocalLimit;
    }

    this.$store.dispatch(MutationTypes.GET_CORPORA_REQUEST, { payload: {}, callback: res => {
      const corpora = res.data['client_corpora'].concat(res.data['wrench_corpora'], res.data['common_corpora']);
      const dropdownValues = formatOptions(corpora);

      this.$data.adopt_curve_x_options = dropdownValues;
      this.$data.adopt_curve_y_options = dropdownValues;
      if (this.$data.adopt_curve_x === undefined || this.$data.adopt_curve_x === 'undefined') {
        this.$data.adopt_curve_x = dropdownValues[0].value;
      }
      if (this.$data.adopt_curve_y === undefined || this.$data.adopt_curve_y === 'undefined') {
        this.$data.adopt_curve_y = dropdownValues[0].value;
      }

      this.$data.influencers_x_options = dropdownValues;
      this.$data.influencers_y_options = dropdownValues;
      if (this.$data.influencers_x === undefined || this.$data.influencers_x === 'undefined') {
        this.$data.influencers_x = dropdownValues[0].value;
      }
      if (this.$data.influencers_y === undefined || this.$data.influencers_y === 'undefined') {
        this.$data.influencers_y = dropdownValues[0].value;
      }
    }});

    this.$store.dispatch(MutationTypes.GET_CLIENT_FILE_FILTERS_REQUEST, { payload: {}, callback: res => {
      const filters = res.data;
      const dropdownValues = formatOptions(filters);

      this.$data.adopt_curve_limit_options = dropdownValues;
      if (this.$data.adopt_curve_limit === undefined || this.$data.adopt_curve_limit === 'undefined') {
        this.$data.adopt_curve_limit = dropdownValues[0].value;
      }

      this.$data.influencers_limit_options = dropdownValues;
      if (this.$data.influencers_limit === undefined || this.$data.influencers_limit === 'undefined') {
        this.$data.influencers_limit = dropdownValues[0].value;
      }
    }});
  }
})


export class DashboardContainer extends Vue {
  contacts = '';
  companies = '';
  equivalent = '';
  modeledInsights = '';

  @Watch('adopt_curve_x')
  adoptCurveXChanged(newValue) {
    localStorage.setItem('adopt_curve_x', newValue)
  }

  @Watch('adopt_curve_y')
  adoptCurveYChanged(newValue) {
    localStorage.setItem('adopt_curve_y', newValue)
  }

  @Watch('adopt_curve_limit')
  adoptCurveLimitChanged(newValue) {
    localStorage.setItem('adopt_curve_limit', newValue)
  }

  @Watch('influencers_x')
  influencersXChanged(newValue) {
    localStorage.setItem('influencers_x', newValue)
  }

  @Watch('influencers_y')
  influencersYChanged(newValue) {
    localStorage.setItem('influencers_y', newValue)
  }

  @Watch('influencers_limit')
  influencersLimitChanged(newValue) {
    localStorage.setItem('influencers_limit', newValue)
  }

  mounted() {
    this.getTopLine();
  }


  getTopLine() {
    this.$store.dispatch(MutationTypes.GET_TOP_LINE_REQUEST, { payload: {}, callback: (res) => {
      if (res.status === 'success') {
        this.contacts = res.data.contacts;
        this.companies = res.data.companies;
        this.equivalent = res.data.equivalent;
        this.modeledInsights = res.data.modeledInsights;
      }
      else {
        console.log(res.msg);
      }
    }});
  }
}
