<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2导航</h2>
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/system/login">登录</router-link></li>
      <li><router-link to="/system/main">后台首页</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '后台管理'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
