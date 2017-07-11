<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  font: 14px Helvetica Neue,Helvetica,PingFang SC,\5FAE\8F6F\96C5\9ED1,Tahoma,Arial,sans-serif;
  line-height: 24px;
}
#app {
  /*font-family: '微软雅黑', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  text-decoration: none;
  color: #333;
}
.icon24{
  font-size: 24px;
}
</style>
