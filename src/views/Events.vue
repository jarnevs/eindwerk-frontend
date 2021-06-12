<template>
  <v-container>
    <v-row
      class="reverse-flex events-top"
      dense
    >
      <v-col
        cols="12"
        md="8"
        order-md="1"
      >
        <div class="search search--full">
          <InputField placeholder="Search" id="search" type="text" @updateValue="filter($event)" />
        </div>
      </v-col>
      <v-col
        cols="12"
        md="4"
        order-md="0"
      >
        <v-btn
          v-if="user.type === 'artist'"
          elevation="0"
          color="cta"
          rounded
          class="white--text cta-button hide-button"
          min-width="100%"
          max-width="100%"
          id="event"
          @click="togglePopUp($event)"
        >New event</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <div class="artists">
          <Card v-for="event in filteredEvents" :key="event.id" :cardData="event" :user="user" type="event" href="events" @followArtist="followArtist($event)"/>
        </div>
        <div class="pop-up" v-if="showPopUp">
            <div class="filter__close pop-up__close">
              <button @click="togglePopUp"><v-icon size="32" color="black">fas fa-times</v-icon></button>
            </div>
            <div class="pop-up__content">
              <v-form class="pop-up__form" @submit.prevent="createEvent">
                <InputField
                  type="text"
                  placeholder="Title"
                  id="title"
                  @updateValue="updateInputValue($event)"
                />
                <InputField
                  type="date"
                  placeholder="Date"
                  id="eventDate"
                  @updateValue="updateInputValue($event)"
                />
                <InputField
                  type="time"
                  placeholder="Time"
                  id="eventTime"
                  @updateValue="updateInputValue($event)"
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  id="location"
                  @updateValue="updateInputValue($event)"
                />
                <TextArea 
                  id="description"
                  placeholder="Description" 
                  @updateValue="updateInputValue($event)"
                  extraClass="form-group__input--textarea-post"
                />
                <Button text="Create event" type="submit" color="cta"/>
              </v-form>
            </div>
          </div>
          <div class="pop-up-overlay" v-if="showPopUp"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import TextArea from '@/components/TextArea.vue';

import { getUserFollowing } from '@/services/users';
import { createEvent, getEventsArtist } from '@/services/events';
import store from '@/store';

export default Vue.extend({
  name: 'Events',
  data: () => ({
    user: {} as any,
    events: [] as {id: string, title: string, description:string, date: number, location: string}[],
    filteredEvents: [] as object[],
    userFollowing: {} as {id: string, following: any[]},
    showPopUp: false,
    title: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
  }),
  components: {
    InputField,
    Card,
    Button,
    TextArea,
  },
  async mounted() {
    this.user = store.getters.getUser;
    if (this.user.type === 'user') {
      this.userFollowing = await getUserFollowing();
      for (const artist of this.userFollowing.following) {
        const eventsArtist = await getEventsArtist(artist.id);
        this.events = [...this.events, ...eventsArtist];
      }
    } else {
      this.events = await getEventsArtist(this.user.id); 
    }
    this.sortEvents();
    this.filteredEvents = this.events;
  },
  methods: {
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async createEvent() {
      const eventDate = new Date(`${this.eventDate} ${this.eventTime}`)
      console.log(eventDate);
      await createEvent({
        title: this.title,
        location: this.location,
        date: eventDate.getTime(),
        description: this.description,
      })

      this.events = await getEventsArtist(this.user.id);
      this.sortEvents();
      this.filteredEvents = this.events;
      this.title = '';
      this.eventDate = '';
      this.eventTime = '';
      this.location = '';
      this.description = '';
      this.showPopUp = !this.showPopUp;
    },
    togglePopUp(e: Event) {
      this.showPopUp = !this.showPopUp
    },
    filter(args: [string, string]) {
      const [id, value] = args;
      this.filteredEvents = this.events.filter((event: any) => event.title.toLowerCase().includes(value));
    },
    sortEvents() {
      this.events.sort((a, b) => (a.date > b.date) ? 1 : -1);
    },
  },
});

</script>
