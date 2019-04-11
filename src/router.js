// vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import MainPage from './views/MainPage.vue'

import UserCenter from './views/UserCenter.vue'
import Affair from './views/Affair.vue'
import Federation from './views/Federation.vue'
import Finance from './views/Finance.vue'
import Activity from './views/Activity.vue'
import ClubList from './views/ClubList.vue'

import ClubPage from './components/clubComp/ClubPage.vue'

import Login from './views/login/Login'

const routes = [
  { path: '/', redirect: '/main/UserCenter' },
  { path: '/Login', component: Login },
  { 
    path: '/main', component: MainPage, 
    children: [
      { path: 'UserCenter', component: UserCenter },
      { path: 'Federation', component: Federation },
      { path: 'Finance', component: Finance },
      { path: 'Activity', component: Activity },
      { path: 'ClubList', component: ClubList },
      { path: 'ClubPage/:clubId', component: ClubPage, props: true },
      { path: 'Affair', component: Affair }
    ]
  }
]

export default new VueRouter({
  routes
})
