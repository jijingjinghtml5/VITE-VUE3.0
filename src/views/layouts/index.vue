<template>
  <div class="app-container">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCaseType } from '@/api/common'
import { mapActions } from 'vuex'
import { getUserInfo } from '@/api/user'
import { Toast } from 'vant'

export default defineComponent({
  name: 'AppLayout',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setUserInfo', 'setEventTypes'])
  },
  async created() {
    if (!localStorage.getItem('access_token')) {
      Toast('尚未登录！')
      // this.$router.push('/login')
      return
    }
    const res = await getUserInfo()
    this.setUserInfo(res.data)
    getCaseType().then((resp) => {
      console.log(resp, 'resp')
      this.setEventTypes(resp.data)
    })
  }
})
</script>
