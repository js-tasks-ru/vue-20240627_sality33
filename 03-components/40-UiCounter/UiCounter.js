import { computed, defineComponent } from "vue";
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const countModel = computed({
      get: () => props.count,
      set: (value) => emit("update:count", value),
    })

    const increment = () => countModel.value += 1;
    const decrement = () => countModel.value -= 1;

    return {
      increment,
      decrement,
      countModel,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count === min" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ countModel }}</span>
      <UiButton aria-label="Increment" :disabled="count === max" @click="increment">➕</UiButton>
    </div>
  `,
})
