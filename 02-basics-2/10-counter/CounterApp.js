import { defineComponent, readonly, ref } from "vue";

const RANGE_MAX = 5;

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0);

    const change = (delta) => count.value += delta;

    return {
      change,
      count: readonly(count),
      RANGE_MAX,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="!count"
        @click="change(-1)"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="count === RANGE_MAX"
        @click="change(1)"
      >➕</button>
    </div>
  `,
})
