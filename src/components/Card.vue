<template>
  <a class="card" :href="`#/${href}/${cardData.id}`">
    <div v-if="type === 'all' && !user.following.some((artist) => (artist.id === cardData.id))" class="follow-button" @click.prevent="followArtist(cardData.id)">
      <v-icon size="22" color="white">fas fa-plus</v-icon>
    </div>
    <img src="@/assets/band.jpg" :alt="cardData.artistName" >
    <div v-if="type === 'event'" class="card__content card__content--show">
      <h2>{{ cardData.title }} </h2>
      <p>{{ cardData.location }}</p>
      <p>{{ formatDate }}</p>
    </div>
    <div v-else class="card__content">
      <h2>{{ cardData.artistName }} </h2>
      <p>{{ shortenDescription }}</p>
    </div>
    <div class="card__overlay"></div>
  </a>
</template>
<script lang="ts">
import Vue from 'vue';
import { followArtist } from '@/services/users';

export default Vue.extend({
  name: 'Card',
  props: {
    cardData: Object,
    type: String,
    href: String,
    user: Object
  },
  computed: {
    shortenDescription() {
      const arrayDescription: string[] = this.cardData.description.split(' ');
      const arrayDescriptionShortened: string[] = arrayDescription.slice(0, 20);

      return `${arrayDescriptionShortened.join(' ')}${arrayDescription.length < 20 ? '' : '...'}`;
    },
    formatDate() {
      const date = new Date(this.cardData.date);
      const dateString = date.toLocaleDateString('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      return dateString.split(', ').join(' - ');
    },
  },
  methods: {
    async followArtist(artistId: string) {
      const userUpdated = await followArtist(artistId);
      this.$emit('followArtist', [userUpdated]);
    }
  }
});
</script>