import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router'
import VueResource from 'vue-resource'
//css
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//filter
import DateFilter from './filters/date'
//add
import Favorit from './components/tools/favorites/CreateFavorit.vue'
import Ip from './components/tools/ips/CreateIp.vue'
import Device from './components/tools/devices/CreateDevice.vue'
import Manufactur from './components/tools/manufacturers/CreateManufactur.vue'
import Subnet from './components/tools/subnets/CreateSubnet.vue'
//edit
import editFavorit from './components/tools/favorites/EditFavorit.vue'
import editIp from './components/tools/ips/EditIp.vue'
import editDevice from './components/tools/devices/EditDevice.vue'
import editManufactur from './components/tools/manufacturers/EditManufactur.vue'
import editSubnet from './components/tools/subnets/EditSubnet.vue'

Vue.component('app-add-favorit', Favorit)
Vue.component('app-add-ip', Ip)
Vue.component('app-add-device', Device)
Vue.component('app-add-manufacturer', Manufactur)
Vue.component('app-add-subnet', Subnet)

Vue.component('app-edit-favorit', editFavorit)
Vue.component('app-edit-ip', editIp)
Vue.component('app-edit-device', editDevice)
Vue.component('app-edit-manufacturer', editManufactur)
Vue.component('app-edit-subnet', editSubnet)

Vue.filter('date', DateFilter)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/notFound');
  }else{
    next();
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
