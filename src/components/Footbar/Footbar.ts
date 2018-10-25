import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import './style.scss';

@Component({
  template: require('./Footbar.html')
})
export class Footbar extends Vue {
  @Getter('isLoggedIn') isLoggedIn!: boolean;
}
