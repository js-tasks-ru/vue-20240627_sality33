import { computed, defineComponent, ref } from "vue";

const getMathOperations = () => {

  const sum = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  return {
    sum,
    subtract,
    multiply,
    divide,
  };
};
const operations = getMathOperations();

export default defineComponent({
  name: "CalculatorApp",

  setup() {
    const numA = ref(0);
    const numB = ref(0);
    const operation = ref(null);
    const result = computed(() => operations[operation.value]?.(numA.value, numB.value) ?? 0);

    const onRadioChange = (event) => {
      operation.value = event.target.value;
    };

    return {
      onRadioChange,
      numA,
      numB,
      result,
      operation,
    };
  },

  template: `
    <div class="calculator">
      <input
        type="number"
        aria-label="First operand"
        v-model="numA"
      />

      <div class="calculator__operators">
        <label><input
          type="radio"
          name="operator"
          value="sum"
          @change="onRadioChange"
        />➕</label>
        <label><input
          type="radio"
          name="operator"
          value="subtract"
          @change="onRadioChange"
        />➖</label>
        <label><input
          type="radio"
          name="operator"
          value="multiply"
          @change="onRadioChange"
        />✖</label>
        <label><input
          type="radio"
          name="operator"
          value="divide"
          @change="onRadioChange"
        />➗</label>
      </div>

      <input
        type="number"
        aria-label="Second operand"
        v-model="numB"
      />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
});
