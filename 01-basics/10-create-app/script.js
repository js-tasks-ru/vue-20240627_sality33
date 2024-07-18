import { defineComponent, createApp } from "vue/dist/vue.esm-bundler.js";

const appComponent = defineComponent({
  name: "App",
  computed: {
    date() {
      return new Date().toLocaleDateString('en-US', {
        dateStyle: "long"
      });
    }
  },

  template: `<div>Сегодня {{ date }}</div>`
});

createApp(appComponent).mount("#app");
