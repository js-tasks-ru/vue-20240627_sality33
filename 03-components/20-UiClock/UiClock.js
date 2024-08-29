import { computed, defineComponent, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "UiClock",

  setup() {

    const date = ref(Date.now());

    const intervalId = setInterval(() => {
      date.value = Date.now();
    }, 1000);

    const time = computed(() => Intl.DateTimeFormat(navigator.language, {
      timeStyle: "medium"
    }).format(date.value));

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return { time };
  },

  template: `<div class="clock">{{ time }}</div>`,
});
