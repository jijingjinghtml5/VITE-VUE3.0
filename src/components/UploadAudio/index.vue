<template>
  <div class="upload-audio">
    <div v-if="value.length > 0" class="audio-area" style="margin-bottom: 15px">
      <audio ref="audio" :src="url + '/' + value[0]" controls style="width: 70%"></audio>
      <div class="del">
        <van-icon name="clear" @click.stop.prevent="deleteAudio"></van-icon>
      </div>
    </div>
    <van-button
      v-if="value.length == 0"
      plain
      type="info"
      icon="volume"
      round
      block
      @click.stop.prevent="startRecord"
      >点击 开始录音</van-button
    >
    <van-dialog
      v-model:show="showDialog"
      title="录音中"
      :overlay-style="{ 'border-radius': '2px' }"
      :close-on-click-overlay="false"
      confirm-button-text="结束录音"
      @closed="stopRecord"
    >
      <div class="record-time">{{ formatTime }}</div>
    </van-dialog>
  </div>
</template>
<script>
import { uploadFile } from '@/api/common'
import { Toast } from 'vant'
import { reactive, toRefs, computed } from 'vue'
import Recorderx, { ENCODE_TYPE } from 'recorderx'
// import config from '@/config'

export default {
  name: 'UploadAudio',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup(props, context) {
    const state = reactive({
      recorder: null,
      showDialog: false,
      recordTimer: null,
      recordTime: 0,
      url: ''
    })
    // 开始录音
    const startRecord = () => {
      state.showDialog = true
      state.recordTime = 0
      state.recorder = new Recorderx()
      state.recorder
        .start()
        .then(() => {
          state.recordTimer = setInterval(() => {
            state.recordTime++
            console.log(state.recordTime)
          }, 1000)
        })
        .catch((error) => {
          console.log('Recording failed.', error)
        })
    }
    // 上传语音
    const upload = (wav) => {
      console.log(wav, 'wav')
      const formData = new window.FormData()
      formData.append('audios', wav)
      uploadFile(formData)
        .then(async (res) => {
          if (res.code === 200) {
            context.emit('input', res.data.audios)
          } else {
            Toast('上传失败')
          }
        })
        .catch((err) => {
          console.log(err, 'err')
        })
    }
    // 删除语音
    const deleteAudio = () => {
      context.$emit('input', [])
    }

    // 停止录音
    const stopRecord = () => {
      console.log(state.recordTime)
      state.showDialog = false
      state.recorder.pause()
      clearInterval(state.recordTimer)
      const wav = state.recorder.getRecord({
        encodeTo: ENCODE_TYPE.WAV
      })
      upload(wav)
    }

    const formatTime = computed(() => {
      const min = Math.floor(state.recordTime / 60)
      const sec = state.recordTime - min * 60
      return `${(min < 10 ? '0' : '') + min}:${sec < 10 ? '0' : ''}${sec}`
    })

    return {
      ...toRefs(state),
      startRecord,
      stopRecord,
      deleteAudio,
      formatTime
    }
  }
}
</script>

<style scoped lang="scss">
.audio-area {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  audio {
    flex-grow: 1;
  }
  > .del {
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 30px;
  }
}
.record-time {
  text-align: center;
}
</style>
