<template>
  <div>
    test-section
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
      msg: '点击我！！！'
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

