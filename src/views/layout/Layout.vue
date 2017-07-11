<template>
  <div class="container">
    <div class="sys-header">
      <div class="header-control">
        <div class="sys-cms">
          <a href="javascript:;" class="sys-logo">Ziyacms</a>
        </div>
        <el-menu class="el-menu-header" mode="horizontal">
          <el-menu-item index="t-1">清除缓存</el-menu-item>
          <el-menu-item index="t-2">
            <a href="https://www.ele.me" target="_blank">计划任务</a>
          </el-menu-item>
          <el-menu-item index="t-3">广告管理</el-menu-item>
          <el-menu-item index="t-4">帮助</el-menu-item>
          <el-submenu index="t-5">
            <template slot="title">
              <a class="sys-user" href="javascript:;">
                <i class="iconfont icon-mine icon24"></i>
                <span>超级管理员</span>
              </a>
            </template>
            <el-menu-item index="1">
              <a>
                <i class="iconfont icon-setup icon24"></i>设置</a>
            </el-menu-item>
            <el-menu-item index="2">
              <a>
                <i class="iconfont icon-lock icon24"></i>锁屏</a>
            </el-menu-item>
            <el-menu-item index="3">
              <a>
                <i class="iconfont icon-tuichu icon24"></i>登出</a>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <leftNav ref="leftNav"></leftNav>
    <div class="main" ref="main">
      <div class="main-top">
        <div id="d-control1">
          <!--<button><i class="iconfont icon-people icon24"></i></button>-->
          <el-button-group>
            <el-button type="control1" @click="letfExpand">
              <i class="iconfont icon24" :class="navs.isExpand?'icon-shouqi':'icon-zhankai'"></i>
            </el-button>
            <el-button type="control1" @click="changeViewScreen">
              <i class="iconfont icon24" :class="screen=='normal'?'icon-fullscreen':'icon-smallscreen'"></i>
            </el-button>
            <el-button type="control1">
              <i class="iconfont icon-dayin icon24"></i>
            </el-button>
          </el-button-group>
        </div>
      </div>
      <div class="main-body">
        <router-view></router-view>
      </div>
      <div class="main-footer">
        <p>2016 ©
          <a href="javascript:;">www.ziyaweb.com</a> 版权所有
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import leftNav from './leftNav'
export default {
  // name: 'systemMain',
  data() {
    return {
      isExpand: true,//左侧菜单是否展
      screen: 'normal',
      route: this.$route
    }
  },components:{
    leftNav
  }, computed: {
    ...mapGetters([
      'navs'
    ])
  }, methods: {
    getCssStyle(element, att) {
      //获取样式 
      //特性侦测
      if (window.getComputedStyle) {
        //优先使用W3C规范
        return window.getComputedStyle(element)[att];
      } else {
        //针对IE9以下兼容
        return element.currentStyle[att];

      }

    },
    requestFullScreen(element) {
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    exitFull() {
      //手动关闭 判断各种浏览器，找到正确的方法
      //ESC和F11关闭全屏无法监听到！只能通过window.onresize来实现判断
      var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen ||    //Chrome等
        document.webkitExitFullscreen || //FireFox
        document.webkitExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      }
      else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          this.changeViewScreen();
          wscript.SendKeys("{F11}");
        }
      }
    },
    letfExpand() {
      this.navs.isExpand = !this.navs.isExpand;
    },
    fullScreen() {
      let t = this;
      let main = this.$refs.main;
      this.screen = 'full';
      this.navs.isExpand = false;
      this.requestFullScreen(main);
    },
    normalScreen() {
      this.screen = 'normal';
      this.navs.isExpand = true;
      this.exitFull();
    },
    changeViewScreen() {
      if (this.screen == 'normal') {
        //全屏视图
        this.fullScreen();
      }
      else {
        //正常视图还原 
        this.normalScreen();
      }
    }
  }, mounted() {
    //console.log(this.navs.isExpand);
    let v = this;
    window.onresize = function () {
      let main = v.$refs.main;
      //按了ESC或者F11退出的全屏模式 
      if (v.screen == 'full' && v.getCssStyle(main, 'top') == '55px') {
        v.normalScreen();
      }

    }
  }, watch: {
    'navs.isExpand': function () {
      let left = this.navs.isExpand ? 0 : -200;
      this.$refs.leftNav.$el.style.left = left + 'px';
      this.$refs.main.style.left = left + 200 + 'px';
    }
  }
 
}
</script>
<style>
.container {
  margin: 0;
  padding: 0;
}

.sys-header {
  position: relative;
  z-index: 1000;
  height: 60px;
}

.sys-header .header-control {
  width: auto;
  margin: 0 15px;
}

.header-control .sys-cms {
  width: 185px;
  height: 70px;
  position: relative;
}

.sys-logo {
  position: absolute;
  left: 0;
  top: 18px;
  color: #333;
  font-size: 24px;
}

.el-menu-header {
  position: absolute;
  right: 10px;
  top: 0;
  padding: 0;
  background: none;
}

.el-menu-header .el-menu-item {
  margin: 0 10px;
  line-height: 65px;
}


.sys-user img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: inline-block;
  border: none;
}

.left-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 999;
  width: 200px;
  overflow-x: hidden;
  top: 55px;
  width: 200px;
  overflow: hidden;
  text-align: left;
}

.left-nav .el-menu {
  height: 100%;
}

.left-nav .el-menu-item.is-active {
  color: #FFFFFF;
  background: #1F2D3D;
}

.left-link {
  color: #F9FAFC;
  font-size: 20px;
  padding-left: 10px;
}

.el-menu--horizontal .el-submenu>.el-menu {
  top: 60px;
}

.left-nav-bottom {
  position: absolute;
  bottom: 0;
  color: #FFFFFF;
  padding-left: 5px;
}

.main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  width: auto;
  overflow: hidden;
  overflow-y: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #DEDEDE;
  bottom: 0;
  top: 55px;
  border-top: 5px solid #1AA094;
}

.main-top {
  height: 40px;
  background: #EEEEEE;
}

#d-control1 {
  float: left;
  background: #1AA094;
  height: 100%;
}

#d-control1 .el-button--control1 {
  height: 40px;
  background-color: #1AA094;
  border: #1AA094;
  color: #FFFFFF;
}

.main-footer {
  position: fixed;
  bottom: 0px;
  height: auto;
  line-height: 26px;
  padding: 5px 0;
  background-color: #eee;
  width: 100%;
}

.main-footer p {
  margin: 0;
}




/*-------------全屏样式------------*/


/*.main:-webkit-full-screen,
.main:-moz-full-screen,
.main:-ms-fullscreen,
.main:fullscreen {
  top: 0;
}*/

.main:fullscreen {
  top: 0;
}

.main-body {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  position: absolute;
  margin-bottom: 36px;
}
</style>

