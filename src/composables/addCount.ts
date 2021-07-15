import { ref } from 'vue'

export default function useFirst() {
  const counter = ref(0)
  function addCount() {
    counter.value++
  }
  return { counter, addCount }
}
