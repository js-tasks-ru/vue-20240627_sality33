import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "MapApp",

  setup() {
    // Реактивные переменные для хранения координат метки
    const x = ref(0);
    const y = ref(0);

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      x.value = event.offsetX;
      y.value = event.offsetY;
    }

    const pinPosition = computed(() => ({
      top: `${y.value}px`,
      left: `${x.value}px`,
    }));

    return {
      handleClick,
      pinPosition,
    };
  },

  template: `
    <div
      class="map"
      @click="handleClick"
    >
      <img
        class="map-image"
        src="./map.png"
        alt="Map"
        draggable="false"
      />
      <span :style="pinPosition" class="pin">📍</span>
    </div>
  `,
});
