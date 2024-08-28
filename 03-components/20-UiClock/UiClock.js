import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: 'UiClock',

  setup() {

    const date = ref(Date.now());
    const intervalId = ref(null);
    const time = computed(() => Intl.DateTimeFormat(navigator.language, {
      timeStyle: 'medium'
    }).format(date.value))

    onMounted(() => {
      intervalId.value = setInterval(() => {
        date.value = Date.now()
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval(intervalId.value);
      intervalId.value = null;
    })

    return { time }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
