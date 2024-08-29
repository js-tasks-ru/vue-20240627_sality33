import { defineComponent } from "vue";
import EmailListItem from "./EmailListItem.js";

export default defineComponent({
  name: "EmailList",

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ["removeEmailByIndex"],

  setup(_, { emit }) {
    const removeEmailByIndex = (index) => emit("removeEmailByIndex", index);

    return { removeEmailByIndex };
  },

  template: `
    <ul
      class="emails-list unstyled-list"
      aria-label="Emails"
    >
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @removeEmail="removeEmailByIndex(index)"
      />
    </ul>
  `,
});
