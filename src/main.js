// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from  'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(mavonEditor)
Vue.prototype.$axios=axios

Vue.config.productionTip = false

Vue.use(Element)
// 按需引用element
// import { Button, Message, MessageBox, Notification, Popover, Tag, Input } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// const components = [Button, Message, MessageBox, Notification, Popover, Tag, Input]

// components.forEach((item) => {
//   Vue.component(item.name, item)
// })

// const MsgBox = MessageBox
// Vue.prototype.$msgbox = MsgBox
// Vue.prototype.$alert = MsgBox.alert
// Vue.prototype.$confirm = MsgBox.confirm
// Vue.prototype.$prompt = MsgBox.prompt
// Vue.prototype.$message = Message
// Vue.prototype.$notify = Notification

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:c=>c(App),
  router,
})
