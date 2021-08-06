import Vue from 'nativescript-vue';
import App from './components/App.vue';
import store from './store';
import routes from './routes';
import VueDevtools from 'nativescript-vue-devtools';
import Global from './utils/global';
import ApiService from './services/api.service'
import ConfigService from './services/config.service'
import OTPService from './services/otp.service'
import OrderService from './services/order.service'
import ActivityStateService from './services/activity_state.service'
import CountryService from './services/country.service'
import PhoneNumberProvider from './providers/phonenumber'
import DateTimePicker from "nativescript-datetimepicker/vue";
// import RadAutoComplete from "nativescript-ui-autocomplete-ex/vue";
// Vue.use(RadAutoComplete);
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)
// Vue.registerElement("SearchView", () => require("nativescript-search-view/search-view").SearchView)
// Vue.registerElement("RadAutoComplete", () => require("nativescript-ui-autocomplete").RadAutoComplete)
// Prints Vue logs when --env.production is *NOT* set while building


Vue.use(DateTimePicker)

Vue.config.silent = (TNS_ENV === 'production');

Vue.registerElement('CheckBox', () => require('@nstudio/nativescript-checkbox').CheckBox, {
	model: {
		prop: 'checked',
		event: 'checkedChange'
	}
});
Vue.registerElement(
    'card-view',
    () => require('@nstudio/nativescript-cardview').CardView
);

const activityStateSercice = new ActivityStateService()
const globals = new Global()
const configService = new ConfigService()
const apiService = new ApiService(configService)
const otpService = new OTPService()
const orderService = new OrderService()
const phone_povider = new PhoneNumberProvider()
const countryService = new CountryService()

Vue.prototype.$activityStateService = activityStateSercice
Vue.prototype.$configService = configService
Vue.prototype.$apiService = apiService
Vue.prototype.$globals = globals
Vue.prototype.$routes = routes
Vue.prototype.$otpService = otpService
Vue.prototype.$orderService = orderService
Vue.prototype.$phoneProvider = phone_povider
Vue.prototype.$countryService = countryService

new Vue({
store,
  render: h => h('frame', [h(activityStateSercice.isComponent()? activityStateSercice.getComponent() : routes.app)])
}).$start();
