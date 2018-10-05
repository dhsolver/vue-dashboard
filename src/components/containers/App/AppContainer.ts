import Vue from 'vue';
import Component from 'vue-class-component';
import { Navbar } from '../../modules/Navbar';
import { Sidebar } from '../../modules/Sidebar';
import { Footbar } from '../../modules/Footbar';

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
}
