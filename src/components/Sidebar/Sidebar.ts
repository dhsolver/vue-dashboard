import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

import './style.scss';

declare function handleSidebarMenu(): any;

@Component({
  template: require('./Sidebar.html')
})

export class Sidebar extends Vue {
  mounted() {
    handleSidebarMenu();
  }
}
