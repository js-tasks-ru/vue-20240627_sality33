import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailListItem",

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["removeEmail"],

  setup(_, { emit }) {
    const removeEmail = () => emit("removeEmail");

    return { removeEmail };
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button
        type="button"
        aria-label="Удалить"
        @click.stop="removeEmail"
      >
        ❌
      </button>
    </li>
  `,
});
