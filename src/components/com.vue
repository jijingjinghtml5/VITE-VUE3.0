<template>
  <div>{{ msg }}</div>
</template>
<script lang="ts">
import { toRefs } from 'vue'

export default {
  name: 'com',
  props: {
    msg: Number
  },
  setup(props) {
    const { msg } = toRefs(props)
    return { msg }
  }
}
</script>
