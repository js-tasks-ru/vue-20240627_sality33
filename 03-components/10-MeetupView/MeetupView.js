import { defineComponent } from "vue";
import { UiAlert, UiContainer } from "@shgk/vue-course-ui";
import MeetupAgenda from "./MeetupAgenda.js";
import MeetupDescription from "./MeetupDescription.js";
import MeetupCover from "./MeetupCover.js";
import MeetupInfo from "./MeetupInfo.js";
import "./MeetupView.css";

export default defineComponent({
  name: "MeetupView",

  components: {
    MeetupInfo,
    MeetupAgenda,
    MeetupDescription,
    MeetupCover,
    UiAlert,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    }
  },

  watch: {
    meetup(v) {
      console.log(v);
    }
  },

  template: `
    <div>

      <MeetupCover
        :image="meetup.image"
        :title="meetup.title"
      />

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>

            <MeetupDescription :description="meetup.description"/>

            <h2>Программа</h2>

            <!-- Программа митапа -->
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <MeetupAgenda v-if="meetup.agenda?.length" :agenda="meetup.agenda"/>
            <UiAlert v-else>Программа пока пуста...</UiAlert>

          </div>
          <div class="meetup__aside">

            <!-- Краткая информация о митапе -->
            <MeetupInfo
              :date="meetup.date"
              :organizer="meetup.organizer"
              :place="meetup.place"
            />

            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
});
