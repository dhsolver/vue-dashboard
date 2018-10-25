import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

declare function handleSidebarMenu(): any;

@Component({
  template: require('./Sidebar.html')
})

export class Sidebar extends Vue {
  mounted() {
    handleSidebarMenu();
  }
}
