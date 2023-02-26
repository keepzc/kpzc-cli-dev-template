<template>
  <div class="<%=name%>">
    <img alt="Vue logo" src="./assets/logo.png">
    <el-button type="primary">主要按钮</el-button>
    <HelloWorld msg="Welcome to Your vue2页面模版" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue';
import clonedeep from 'lodash.clonedeep'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created () {
    let obj = { a: 'zc' }
    let newObj = clonedeep(obj)
    console.log(obj === newObj);
  }
}
</script>

<style>
.<%=name%> {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
