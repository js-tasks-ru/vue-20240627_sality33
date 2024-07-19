import { defineComponent, createApp } from "vue/dist/vue.esm-bundler.js";

createApp(defineComponent({
  name: "DateApp",
  computed: {
    date() {
      return new Date().toLocaleDateString(navigator.language, { dateStyle: "long" });
    }
  },

  template: `<div>Сегодня {{ date }}</div>`
}))
  .mount('#app');
