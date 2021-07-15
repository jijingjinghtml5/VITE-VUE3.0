import { Ref, ref } from 'vue'

export default function useSecond() {
  const second: Ref<Array<number>> = ref([])
  function changeSecond() {
    const num: number = Math.random() * 10
    second.value.push(num)
  }
  return {
    second,
    changeSecond
  }
}
