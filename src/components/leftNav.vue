<template>
    <div class="left-nav">
        <el-menu ref="leftMenu" :active="navs.current" :default-active="navs.current" class="el-menu-vertical-demo" theme="dark"  @select="handleSelect" :router="true">
            <el-menu-item :index="route.path" v-for="(route,index) in $router.options.routes[1].children" :key="index">
                <i class="iconfont icon24" :class="route.icon"></i>
                <span class="nav-title">{{route.name}}</span>
            </el-menu-item>
        </el-menu>
        <!--<div class="left-nav-bottom">
            <span>系统时间:</span>
            <p>2017-7-6 14:48 53</p>
        </div>-->
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['navs'])
    },
    methods: {
        handleSelect(){
            this.$refs.leftMenu.activedIndex = this.navs.current;
        }
    },
    mounted(){
       // this.$refs.leftMenu.activedIndex = this.currentRoute;
    }
}
</script>
<style>
.nav-title{
    font-size: 20px;
    font-family: "微软雅黑"
}
</style>
