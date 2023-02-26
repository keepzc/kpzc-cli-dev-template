<template>
  <div class="<%=name%>">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>vue3-页面模版</h1>
    <HelloWorld msg="Welcome to Your Vue.js 页面模版" />
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import clonedeep from 'lodash.clonedeep'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup () {
    const obj = reactive({
      name: 'zc'
    })
    const obj2 = clonedeep(obj)
    console.log(obj === obj2);
  }
})
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
