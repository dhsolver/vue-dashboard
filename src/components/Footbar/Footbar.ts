import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Logger } from '../../utils/log';
import { Getter } from 'vuex-class';

import './style.scss';

@Component({
  template: require('./Footbar.html')
})
export class Footbar extends Vue {

  protected logger: Logger;


  inverted: boolean = true; // default value

  object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

  @Getter('loggedIn', {}) loggedIn!: any;

  @Watch('$route.path')
  pathChanged() {
    this.logger.info('Changed current path to: ' + this.$route.path);
  }
  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info(this.object.default));
  }
}
