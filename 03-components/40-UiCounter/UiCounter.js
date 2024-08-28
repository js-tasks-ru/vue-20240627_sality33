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
    const reachedMin = computed(() => countModel.value === props.min);
    const reachedMax = computed(() => countModel.value === props.max);

    const increment = () => countModel.value += 1;
    const decrement = () => countModel.value -= 1;

    return {
      increment,
      decrement,
      countModel,
      reachedMin,
      reachedMax,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="reachedMin" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ countModel }}</span>
      <UiButton aria-label="Increment" :disabled="reachedMax" @click="increment">➕</UiButton>
    </div>
  `,
})
