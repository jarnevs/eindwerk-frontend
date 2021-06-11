<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <div class="search search--full">
          <InputField placeholder="Search" id="search" type="text" @updateValue="filter($event)" />
        </div>
        <div class="artists">
          <Card v-for="artist in filteredArtists" :key="artist.id" :cardData="artist" :user="user" type="follows" href="artists" @followArtist="followArtist($event)"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Card from '@/components/Card.vue';

import { getUserFollowing } from '@/services/users';

export default Vue.extend({
  name: 'Following',
  data: () => ({
    artists: [] as {id: string, artistName: string, genre: string, desciprtion:string}[],
    filteredArtists: [] as {id: string, artistName: string, genre: string, desciprtion:string}[],
    user: {} as {id: string, following: any[]},
  }),
  components: {
    InputField,
    Card
  },
  async mounted() {
    this.user = await getUserFollowing();
    this.artists = this.user.following;
    this.filteredArtists = this.artists;
  },
  methods: {
    filter(args: [string, string]) {
      const [id, value] = args;
      this.filteredArtists = this.artists.filter((artist) => artist.artistName.toLowerCase().includes(value));
    },
  },
});

</script>
