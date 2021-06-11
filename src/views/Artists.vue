<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="5"
        lg="4"
        xl="2"
        class="filter"
        :class="showFilter ?  'filter--show' : ''"
      >
        <form class="filter__content" @submit.prevent="filter">
          <div class="filter__close hide-button">
            <button @click="toggleFilter"><v-icon size="32" color="black">fas fa-times</v-icon></button>
          </div>
          <p>Genres</p>
          <div v-for="genre in genres" class="filter__option" :key="genre.id">
            <input type="checkbox" name="genres" :id="genre.name" :value="genre.id" @change="toggleGenre($event)">
            <div></div>
            <label :for="genre.name">{{genre.name}}</label>
          </div>
          <div class="filter__button">
            <Button text="Filter" type="submit" color="cta"/>
          </div>
        </form>
      </v-col>
      <v-col
        cols="12"
        md="7"
        lg="8"
        xl="10"
      >
        <div class="search">
          <v-btn
            elevation="0"
            color="cta"
            rounded
            class="white--text cta-button hide-button"
            min-width="78"
            max-width="78"
            @click="toggleFilter"
          >Genres</v-btn>
          <InputField placeholder="Search" id="search" type="text" @updateValue="searchArtists($event)" />
        </div>
        <div class="artists">
          <Card v-for="artist in filteredArtists" :key="artist.id" :cardData="artist" :user="user" type="all" href="artists" @followArtist="followArtist($event)"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';

import { getArtists, getUserFollowing } from '@/services/users';
import { getGenres } from '@/services/genres';

export default Vue.extend({
  name: 'Artists',
  data: () => ({
    artists: [] as {id: string, artistName: string, genre: string, desciprtion:string}[],
    filteredArtists: [] as {id: string, artistName: string, genre: string, desciprtion:string}[],
    genres: [] as {id: string, name: string}[],
    user: {},
    showFilter: false,
    searchTeam: '',
    selectedGenres: [] as string[],
  }),
  components: {
    InputField,
    Button,
    Card
  },
  async mounted() {
    this.user = await getUserFollowing();
    this.artists = await getArtists();
    this.genres = await getGenres();
    this.filteredArtists = this.artists;
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleGenre(e: InputEvent) {
      const element = e.target as HTMLInputElement;
      const { value } = element;

      if (!this.selectedGenres.includes(value)) {
        this.selectedGenres.push(value);
      } else {
        this.selectedGenres = this.selectedGenres.filter((genre) => genre !== value);
      }
    },
    searchArtists(args: [string, string]) {
      const [id, value] = args;
      this.searchTeam = value;
      this.filter();
    },
    filter() {
      this.filteredArtists = this.artists.filter((artist) => artist.artistName.toLowerCase().includes(this.searchTeam));
      if (this.selectedGenres.length > 0) {
        this.filteredArtists = this.filteredArtists.filter((artist) => this.selectedGenres.includes(artist.genre));
      }
      this.showFilter = false;
    },
    followArtist(args: any[]) {
      const [updatedUser] = args;
      console.log(updatedUser);
      this.user = updatedUser;
    }
  },
});

</script>
