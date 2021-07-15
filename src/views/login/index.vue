<template>
  <div class="page-container">
    <div class="page-warpper">
      <div class="login-title">登 录</div>
      <van-cell-group>
        <van-field
          v-model="username.text"
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          left-icon="contact"
          @click-right-icon="$toast('用户名必须是系统开通账户名')"
        />
        <van-field
          v-model="password.text"
          clearable
          type="password"
          label="密码"
          right-icon="question-o"
          placeholder="请输入密码"
          left-icon="closed-eye"
          @click-right-icon="$toast('密码必须是数字、字母、下划线')"
        />
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, ref, onMounted } from 'vue'
import { fetchLogin } from '@/api/user'
import { Toast } from 'vant'
import router from '@/router/index'

function validate(value: { text: string; rule: { message: string } }) {
  const error = ref(false)
  const errorValue = ref('')
  const validateInput = () => {
    if (!value.text || value.text == '') {
      error.value = true
      errorValue.value = value.rule.message
    } else {
      error.value = false
      errorValue.value = ''
    }
  }
  return {
    error,
    validateInput,
    errorValue
  }
}

export default {
  name: 'login',
  setup() {
    const state = reactive({
      username: {
        text: '',
        rule: {
          message: '用户名不能为空'
        }
      },
      password: {
        text: '',
        rule: {
          message: '密码不能为空'
        }
      }
    })
    onMounted(() => {
      console.log('mounted')
    })
    const { error: error1, validateInput: validateInput1, errorValue: errorValue1 } = validate(
      state.username
    )
    const { error: error2, validateInput: validateInput2, errorValue: errorValue2 } = validate(
      state.password
    )
    console.log(validateInput1, validateInput2)
    const login = async () => {
      validateInput1()
      validateInput2()
      if (error1.value) {
        Toast(errorValue1.value)
      } else if (error2.value) {
        Toast(errorValue2.value)
      } else if (!error1.value && !error2.value) {
        const res = await fetchLogin({
          username: state.username.text,
          password: state.password.text
        })

        router.push('/home')
      }
    }
    return {
      ...toRefs(state),
      error1,
      error2,
      validateInput1,
      validateInput2,
      errorValue1,
      errorValue2,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 36px;
  padding: 0 12px;
}
.van-cell-group {
  margin: 50px 0;
}
</style>
