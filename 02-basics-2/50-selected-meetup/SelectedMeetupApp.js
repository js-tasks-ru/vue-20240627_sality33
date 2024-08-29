import { defineComponent, ref, watch } from "vue";
import { getMeetup } from "./meetupsService.ts";

const RADIO_GROUP_DATA = [
  { id: "meetup-id-1", value: 1 },
  { id: "meetup-id-2", value: 2 },
  { id: "meetup-id-3", value: 3 },
  { id: "meetup-id-4", value: 4 },
  { id: "meetup-id-5", value: 5 },
];

export default defineComponent({
  name: "SelectedMeetupApp",

  setup() {
    const meetups = ref({});
    const selectedId = ref(RADIO_GROUP_DATA.at(0).value);
    const selectMeetup = (id) => {
      selectedId.value = id;
    };

    watch(selectedId, async (id) => {
      if (!id || meetups.value[id]) return;
      meetups.value[id] = await getMeetup(id);
    }, { immediate: true });

    return {
      meetups,
      selectedId,
      selectMeetup,
      RADIO_GROUP_DATA,
    };
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedId === RADIO_GROUP_DATA.at(0).value"
          @click="selectMeetup(selectedId - 1)"
        >
          Предыдущий
        </button>

        <div
          class="radio-group"
          role="radiogroup"
        >
          <div
            v-for="el in RADIO_GROUP_DATA"
            class="radio-group__button"
          >
            <input
              :id="el.id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="el.value"
              v-model="selectedId"
            />
            <label
              :for="el.id"
              class="radio-group__label"
            >
              {{ el.value }}
            </label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="selectedId === RADIO_GROUP_DATA.at(-1).value"
          @click="selectMeetup(selectedId + 1)"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetups[selectedId]?.title }}</h1>
        </div>
      </div>

    </div>
  `,
});
