import Vue from 'vue';
import Component from 'vue-class-component';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { Footbar } from '../../components/Footbar';

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
