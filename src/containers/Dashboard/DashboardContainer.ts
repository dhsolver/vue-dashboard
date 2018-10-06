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

    const localX = localStorage.getItem('adopt_curve_x');
    if (localX) {
      this.$data.adopt_curve_x = localX;
    }
    const localY = localStorage.getItem('adopt_curve_y');
    if (localY) {
      this.$data.adopt_curve_y = localY;
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
    }});
  }
})


export class DashboardContainer extends Vue {
  @Watch('adopt_curve_x') adoptCurveXChanged(newValue, oldValue) {
    localStorage.setItem('adopt_curve_x', newValue)
  }
  @Watch('adopt_curve_y') adoptCurveYChanged(newValue, oldValue) {
    localStorage.setItem('adopt_curve_y', newValue)
  }
}
