import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import App from './App.vue'
import router from './router'
import './theme/index.less'
import Antd, { FormModel } from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import api from './services/api/index'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import 'animate.css/source/animate.css'
import VueI18n from 'vue-i18n'
import Plugins from '@/plugins'
import EasyScroll from 'easyscroll'
import echarts from 'echarts'
import Router from 'vue-router'

Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
Vue.use(FormModel)
Vue.use(VueI18n)
Vue.use(Plugins)
Vue.use(EasyScroll)

const i18n = new VueI18n({
  locale: 'CN',
  fallbackLocale: 'US',
  silentFallbackWarn: true
})
const  routerPush=Router.prototype.push;
Router.prototype.push=function push(location) {
return routerPush.call(this,location).catch(error => error)
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  methods:{},
  mounted() {
    let db = new PouchDB('adminDb')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setUser', doc.user)
    })
  },
}).$mount('#app')
