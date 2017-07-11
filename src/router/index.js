import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
//import SysMain from '@/components/SysMain'
import Layout from '@/components/Layout'
import Config from '@/components/Config'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '后台首页',
      component: Layout,
      redirect: '/system/main',
      hidden: true
    },
    {
      path: '/system',
      name: 'SYSTEM',
      component: Layout,
      redirect: '/system/main',
      icon: 'icon-computer',
      children: [
        { name: '控制面板', path: '/system/main',icon:'icon-computer', component: Hello},
        { name: '系统配置', path: '/system/config',icon:'icon-setup', component: Config},
        { name: '内容管理', path: '/system/content', icon: 'icon-document' },
        { name: '页面管理', path: '/system/pages', icon: 'icon-pageset' },
        { name: '产品管理', path: '/system/product', icon: 'icon-publishgoods_fill' },
        { name: '评论管理', path: '/system/comment', icon: 'icon-message' },
        { name: '用户管理', path: '/system/users', icon: 'icon-people' },
        { name: '数据管理', path: '/system/datas' ,icon:'icon-shujuku'},
        { name: '系统统计', path: '/system/counts' ,icon:'icon-tiaoxingtu-xianxing'}]
    }
     ,{
      path: '/system/login',
      name: 'systemLogin',
       component: Login
    }
  ]
})


export default router;