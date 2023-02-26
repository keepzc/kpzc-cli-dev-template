<template>
  <button @click="warning">{{ msg }}</button>
</template>
<script>
export default {
  name: 'Test',
  props: {
    msg: String
  },
  components: {

  },
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    warning () {
      alert('你好啊')
    }
  },
  created () {

  },
  mounted () {

  },
}
</script>
<style></style>

