import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import './style.scss';

@Component({
  template: require('./LoadingIndicator.html')
})
export class LoadingIndicator extends Vue {
}
