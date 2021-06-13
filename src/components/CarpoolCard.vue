<template>
  <div class="carpool-card">
    <div class="carpool-card__content">
      <div class="carpool-card__info">
        <h1>{{ cardData.concert }}</h1>
        <p><strong>Available seats:</strong> {{ cardData.seats }}</p>
        <div class="carpool-card__info-pickup">
          <p><strong>Pickup:</strong> {{ cardData.location }}</p>
          <p><strong>Time:</strong> {{ formatDate }}</p>
        </div>
        <p><strong>Offered by:</strong> {{ cardData.user.firstname }} {{ cardData.user.lastname }}</p>
      </div>
      <div v-if="find" class="carpool-card__button">
        <v-btn
          v-if="!accepted"
          elevation="0"
          color="cta"
          rounded
          class="white--text cta-button hide-button"
          @click="changeStatus(cardData.id, true)"
        >
          <v-icon size="21" color="color">fas fa-plus</v-icon>
        </v-btn>
        <v-btn
          v-else
          elevation="0"
          color="black"
          rounded
          class="white--text cta-button hide-button"
          @click="changeStatus(cardData.id, false)"
        >
          <v-icon size="21" color="color">fas fa-trash</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { followArtist } from '@/services/users';

export default Vue.extend({
  name: 'Card',
  props: {
    cardData: Object,
    find: Boolean,
    accepted: Boolean,
  },
  computed: {
    formatDate() {
      const date = new Date(this.cardData.time);
      const dateString = date.toLocaleDateString('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      return dateString.split(', ').join(' - ');
    },
  },
  methods: {
    async changeStatus(spotId: string, add: boolean) {
      this.$emit('changeStatus', [spotId, add]);
    }
  }
});
</script>