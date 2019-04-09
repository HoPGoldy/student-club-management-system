// vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import UserCenter from './views/UserCenter.vue'
import Affair from './views/Affair.vue'
import Federation from './views/Federation.vue'
import Finance from './views/Finance.vue'
import Activity from './views/Activity.vue'

const routes = [
  { path: '/UserCenter', component: UserCenter },
  { path: '/Federation', component: Federation },
  { path: '/Finance', component: Finance },
  { path: '/Activity', component: Activity },
  { path: '/Affair', component: Affair }
]

export default new VueRouter({
  routes
})
