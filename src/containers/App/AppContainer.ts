import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footbar } from '../../components/Footbar';

declare function updateIntercom(): any;

@Component({
  template: require('./app.html'),
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar,
    'mainfooter': Footbar
  }
})
export class AppContainer extends Vue {
  mode: string = process.env.ENV;
  @Watch('$route')
  routeChanged() {
    updateIntercom();
  }
}
