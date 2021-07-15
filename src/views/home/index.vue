<template>
  <div class="page-container">
    <div class="page-warpper">
      <UploadAudio v-model="audioList"></UploadAudio>
      <com-child :msg="counter"></com-child>
      <button @click="addCount">add</button>
      <div v-for="(item, index) in second" :key="index">
        <span>{{ item }}</span>
      </div>
      <button @click="changeSecond">changeSecond</button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import useFirst from '@/composables/addCount'
import useSecond from '@/composables/addArray'
import comChild from '@/components/com.vue'
import UploadAudio from '@/components/UploadAudio/index.vue'

export default {
  name: 'content',
  components: {
    comChild,
    UploadAudio
  },
  // inject: {
  //   book: {
  //     from: 'guide'
  //   }
  // },
  setup() {
    const audioList = ref([])
    const { counter, addCount } = useFirst()
    const { second, changeSecond } = useSecond()
    return { counter, addCount, second, changeSecond, audioList }
  }
}
</script>
