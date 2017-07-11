// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/';
Vue.config.productionTip = false
//全局加载
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
//Vue.use(ElementUI)
//按需求加载elementUI
import {
  Loading, Message, MessageBox, Form, FormItem, Input, Button, ButtonGroup, Alert, Notification, Icon, Row, Col, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'
Vue.use(Loading.directive);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message


/**
 *定义axios拦截器
*/
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  loadinginstace.close();
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})


const SYSUSER = {
  username: '张三',
  allow: [{ url: '/', name: '首页' }, { url: '/system/login', name: '系统登录' }, { url: '/system/main', name: '系统主页' }, { url: '/system/config', name: '系统设置' }],
  urls: []
}
SYSUSER.allow.forEach(o => {
  SYSUSER.urls.push(o.url);
});
//console.log(SYSUSER.urls);
//前端路由拦截判定权限
router.beforeEach((to, from, next) => {
  if (SYSUSER.urls.find(url => url == to.fullPath)) {
    //设置当前导航的路由URL
    // console.log(to.path);
    // console.log(store.state.app.navs);
    store.state.app.navs.current = to.path;
    
    next();
  }
  else {
    Message.error({ message: '无权访问。' });

  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
