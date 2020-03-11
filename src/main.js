// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import global_ from './components/common/globalConst'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.prototype.$GLOBAL = global_
Vue.prototype.$ajax = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
