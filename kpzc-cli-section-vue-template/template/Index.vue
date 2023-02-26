<template>
  <div>
    test-section-vue1
    <Test :msg="msg" />
  </div>
</template>
<script>
import Test from './components/Test.vue'
export default {
  name: 'Index',
  components: {   //挂载 注册的组件
    Test
  },
  data () {
    return {
      msg: '点击看2023'
    }
  },
  watch: {

  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  },
}
</script>
<style></style>

