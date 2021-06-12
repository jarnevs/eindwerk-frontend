<template>
  <div>
    <div class="hero-mobile">
      <div class="hero-mobile__image">
        <img src="@/assets/band.jpg" alt="">
      </div>
      <div class="hero-mobile__info hero-mobile__info--event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.location }}</p>
        <p>{{ formatDate }}</p>
      </div>
      <div class="hero-mobile__info hero-mobile__info-buttons">
        <v-btn
          elevation="0"
          :color="!!event.going && event.going.includes(user.id) ? 'cta': 'black'"
          rounded
          class="white--text cta-button"
          min-width="102"
          max-width="102"
          @click="changeStatus('going')"
        >Going</v-btn>
        <v-btn
          elevation="0"
          :color="!!event.maybe && event.maybe.includes(user.id) ? 'cta': 'black'"
          rounded
          class="white--text cta-button"
          min-width="102"
          max-width="102"
          @click="changeStatus('maybe')"
        >Maybe</v-btn>
        <v-btn
          elevation="0"
          :color="!!event.notGoing && event.notGoing.includes(user.id) ? 'cta': 'black'" 
          rounded
          class="white--text cta-button"
          min-width="102"
          max-width="102"
          @click="changeStatus('not')"
        >Not going</v-btn>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="hero-large">
            <div class="hero-large__image">
              <img src="@/assets/band.jpg" alt="">
            </div>
            <div class="hero-large__info hero-mobile__info--event">
              <h1>{{ event.title }}</h1>
              <p>{{ event.location }}</p>
              <p>{{ formatDate }}</p>
            </div>
            <div class="hero-mobile__info hero-mobile__info-buttons">
              <v-btn
                elevation="0"
                :color="!!event.going && event.going.includes(user.id) ? 'cta': 'black'"
                rounded
                class="white--text cta-button"
                min-width="102"
                max-width="102"
                @click="changeStatus('going')"
              >Going</v-btn>
              <v-btn
                elevation="0"
                :color="!!event.maybe && event.maybe.includes(user.id) ? 'cta': 'black'"
                rounded
                class="white--text cta-button"
                min-width="102"
                max-width="102"
                @click="changeStatus('maybe')"
              >Maybe</v-btn>
              <v-btn
                elevation="0"
                :color="!!event.notGoing && event.notGoing.includes(user.id) ? 'cta': 'black'" 
                rounded
                class="white--text cta-button"
                min-width="102"
                max-width="102"
                @click="changeStatus('not')"
              >Not going</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <p>{{ event.description }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import TextArea from '@/components/TextArea.vue';
import Button from '@/components/Button.vue';
import Post from '@/components/Post.vue';
import Card from '@/components/Card.vue';

import store from '@/store';
import { getEvent, updateStatus } from '@/services/events';

export default Vue.extend({
  name: 'Event',
  data: () => ({
    event: {} as {id: string, title: string, description:string, date: number, location: string, going: string[], maybe: string[], notGoing: string[]},
    user: {},
  }),
  components: {
    Post,
    Card,
    InputField,
    TextArea,
    Button,
  },
  async mounted() {
    this.event = await getEvent(this.$route.params.id);
    this.user = store.getters.getUser;
    console.log(this.event);
    console.log(this.event.maybe);
    console.log(this.event.notGoing);
  },
  computed: {
    formatDate() {
      const date = new Date(this.event.date);
      const dateString = date.toLocaleDateString('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      return dateString.split(', ').join(' - ');
    },
  },
  methods: {
    async changeStatus(status: string) {
      await updateStatus(this.event.id, status);
      this.event = await getEvent(this.$route.params.id);
    }
  },
});

</script>
