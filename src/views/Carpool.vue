<template>
  <v-container>
    <v-row
      class="reverse-flex events-top"
      dense
    >
      <v-col
        cols="12"
        md="4"
      >
        <div class="page-nav">
            <ul class="page-nav__container">
              <li class="page-nav__item">
                <a 
                  id="find"
                  class="page-nav__link"
                  :class="selectedItem === 'find' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Find spot
                </a>
              </li>
              <li class="page-nav__item">
                <a 
                  id="accepted"
                  class="page-nav__link"
                  :class="selectedItem === 'accepted' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Accepted
                </a>
              </li>
              <li class="page-nav__item">
                <a
                  id="offered"
                  class="page-nav__link"
                  :class="selectedItem === 'offered' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Offered
                </a>
              </li>
            </ul>
          </div>
      </v-col>
    </v-row>
    <v-row
      class="reverse-flex events-top"
      dense
    >
      <v-col
        cols="12"
        md="4"
      >
        <v-btn
          elevation="0"
          color="cta"
          rounded
          class="white--text cta-button hide-button"
          min-width="100%"
          max-width="100%"
          id="event"
          @click="togglePopUp()"
        >Offer spot</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <div v-if="selectedItem === 'find'" class="artists">
          <CarpoolCard v-for="spot in findSpots" :key="spot.id" :cardData="spot" find @changeStatus="changeStatus"/>
        </div>
        <div v-else-if="selectedItem === 'accepted'" class="artists">
          <CarpoolCard v-for="spot in acceptedSpots" :key="spot.id" :cardData="spot" find accepted @changeStatus="changeStatus"/>
        </div>
        <div v-else class="artists">
          <CarpoolCard v-for="spot in offeredSpots" :key="spot.id" :cardData="spot"/>
        </div>
        <div class="pop-up" v-if="showPopUp">
            <div class="filter__close pop-up__close">
              <button @click="togglePopUp"><v-icon size="32" color="black">fas fa-times</v-icon></button>
            </div>
            <div class="pop-up__content">
              <v-form class="pop-up__form" @submit.prevent="createCarpoolSpot">
                <div class="form-group">
                  <select class="form-group__select" id="concert" @change="changeSelectOption($event)">
                    <option value="" disabled selected>Select concert</option>
                    <option v-for="event in events" :key="event.id" :value="event.id">{{ event.title }}</option>
                  </select>
                </div>
                <InputField
                  type="number"
                  placeholder="Available seats"
                  id="seats"
                  @updateValue="updateInputValue($event)"
                />
                <InputField
                  type="date"
                  placeholder="Date"
                  id="pickupDate"
                  @updateValue="updateInputValue($event)"
                  :value="pickupDate"
                />
                <InputField
                  type="time"
                  placeholder="Time"
                  id="pickupTime"
                  @updateValue="updateInputValue($event)"
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  id="location"
                  @updateValue="updateInputValue($event)"
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
import CarpoolCard from '@/components/CarpoolCard.vue';

import { changeUserStatusCarpool, createCarpoolSpot, getCarpoolSpotsEvent } from '@/services/carpool';
import { getEventsCarpool } from '@/services/events';
import store from '@/store';

export default Vue.extend({
  name: 'Carpool',
  data: () => ({
    user: {} as any,
    events: [] as { id: string, title: string, date: number }[],
    carpoolSpots: [] as { id: string, concert: string, seats: number, time: number, location: string, user: {id: string, firstname: string, lastname: string}, accepted: string[]}[],
    acceptedSpots: [] as { id: string, concert: string, seats: number, time: number, location: string, user: {id: string, firstname: string, lastname: string}, accepted: string[]}[],
    offeredSpots: [] as { id: string, concert: string, seats: number, time: number, location: string, user: {id: string, firstname: string, lastname: string}, accepted: string[]}[],
    findSpots: [] as { id: string, concert: string, seats: number, time: number, location: string, user: {id: string, firstname: string, lastname: string}, accepted: string[]}[],
    showPopUp: false,
    selectedItem: 'find',
    concert: '',
    seats: '',
    pickupDate: '',
    pickupTime: '',
    location: '',
  }),
  components: {
    InputField,
    Card,
    Button,
    CarpoolCard,
  },
  async mounted() {
    this.user = store.getters.getUser;
    this.events = await getEventsCarpool();

    this.filterCarpoolSpots();
  },
  methods: {
    changeSelectOption(e: InputEvent) {
      const target = e.target as HTMLSelectElement;
      const { value } = target;

      const event = this.events.find((event) => event.id === value);
      const date = event?.date;

      let datePickup = '';

      if (date) {
        const eventDate = new Date(date);

        const years = eventDate.getFullYear();
        const month = eventDate.getMonth() + 1;
        const day = eventDate.getDate();

        datePickup = `${years}-${this.addZeros(month)}-${this.addZeros(day)}`
      }

      this.pickupDate = datePickup;
      this.concert = value;
    },
    addZeros(value: number) {
      return value < 10 ? `0${value}` : value;
    },
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async createCarpoolSpot() {
      const time = new Date(`${this.pickupDate} ${this.pickupTime}`);
      const spot = await createCarpoolSpot({
        concert: this.concert,
        seats: parseInt(this.seats),
        time: time.getTime(),
        location: this.location,
      });

      console.log(spot);

      this.concert = '';
      this.seats = '';
      this.pickupDate = '';
      this.pickupTime = '';
      this.location = '';
      this.togglePopUp();
      this.filterCarpoolSpots();
      this.$forceUpdate();
    },
    async changeStatus(args: any[]) {
      const [ spotId, add ] = args;
      console.log(spotId)
      await changeUserStatusCarpool(spotId, add);
      this.filterCarpoolSpots();
    },
    async filterCarpoolSpots() {
      this.carpoolSpots = [];

      for (const event of this.events) {
        const spots = await getCarpoolSpotsEvent(event.id);
        this.carpoolSpots = [...spots, ... this.carpoolSpots];
      }

      this.acceptedSpots = this.carpoolSpots.filter((spot) => spot.accepted.includes(this.user.id));
      this.offeredSpots = this.carpoolSpots.filter((spot) => spot.user.id === this.user.id);
      this.findSpots = this.carpoolSpots.filter((spot) => !spot.accepted.includes(this.user.id) && spot.user.id !== this.user.id && spot.seats > spot.accepted.length);
    },
    changeSelectedItem(e: InputEvent) {
      const element = e.target as HTMLAnchorElement;
      const { id } = element;

      this.selectedItem = id;
    },
    togglePopUp() {
      this.showPopUp = !this.showPopUp
    },
  },
});

</script>
