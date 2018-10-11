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
        this.$data.adopt_curve_x_options = formatOptions(res.data['common_corpora']);
        this.$data.adopt_curve_y_options = formatOptions(res.data['client_corpora']);
        if (!this.$data.adopt_curve_x) {
          this.$data.adopt_curve_x = res.data['common_corpora'][0][0];
        }
        if (!this.$data.adopt_curve_y) {
          this.$data.adopt_curve_y = res.data['client_corpora'][0][0];
        }

        this.$data.influencers_x_options = formatOptions(res.data['common_corpora']);
        this.$data.influencers_y_options = formatOptions(res.data['client_corpora']);
        if (!this.$data.influencers_x) {
          this.$data.influencers_x = res.data['common_corpora'][0][0];
        }
        if (!this.$data.influencers_y) {
          this.$data.influencers_y = res.data['client_corpora'][0][0];
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
