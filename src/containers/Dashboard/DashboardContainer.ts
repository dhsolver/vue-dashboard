import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {MutationTypes} from '../../store/mutation-types';

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
       adopt_curve_x_options: [],
       adopt_curve_y_options: [],
       influencers_x: '',
       influencers_y: '',
       influencers_x_options: [],
       influencers_y_options: [],
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

    const influencersLocalX = localStorage.getItem('influencers_x');
    if (influencersLocalX) {
      this.$data.influencers_x = influencersLocalX;
    }
    const influencersLocalY = localStorage.getItem('influencers_y');
    if (influencersLocalY) {
      this.$data.influencers_y = influencersLocalY;
    }

    this.$store.dispatch(MutationTypes.GET_CORPORA, { payload: {}, callback: res => {
      const corpora = res.data['client_corpora'].concat(res.data['wrench_corpora'], res.data['common_corpora']);
      const dropdownValues = formatOptions(corpora);

      this.$data.adopt_curve_x_options = dropdownValues;
      this.$data.adopt_curve_y_options = dropdownValues;
      if (this.$data.adopt_curve_x === undefined || this.$data.adopt_curve_x === "undefined") {
        this.$data.adopt_curve_x = dropdownValues[0].value;
      }
      if (this.$data.adopt_curve_y === undefined || this.$data.adopt_curve_y === "undefined") {
        this.$data.adopt_curve_y = dropdownValues[0].value;
      }

      this.$data.influencers_x_options = dropdownValues;
      this.$data.influencers_y_options = dropdownValues;
      if (this.$data.influencers_x === undefined || this.$data.influencers_x === "undefined") {
        this.$data.influencers_x = dropdownValues[0].value;
      }
      if (this.$data.influencers_y === undefined || this.$data.influencers_y === "undefined") {
        this.$data.influencers_y = dropdownValues[0].value;
      }
    }});


  }
})


export class DashboardContainer extends Vue {
  @Watch('adopt_curve_x')
  adoptCurveXChanged(newValue) {
    localStorage.setItem('adopt_curve_x', newValue)
  }

  @Watch('adopt_curve_y')
  adoptCurveYChanged(newValue) {
    localStorage.setItem('adopt_curve_y', newValue)
  }

  @Watch('influencers_x')
  influencersXChanged(newValue) {
    localStorage.setItem('influencers_x', newValue)
  }

  @Watch('influencers_y')
  influencersYChanged(newValue) {
    localStorage.setItem('influencers_y', newValue)
  }
}
