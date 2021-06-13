<template>
  <nav>
    <div class="main-nav__above">
      <a class="close-nav hide-icon" @click.prevent="closeMenu">
        <v-icon size="32" color="white">fas fa-arrow-right</v-icon>
      </a>
      <div class="profile-nav">
        <a :href="user.type === 'user' ? `#/profile/user/${user.id}` : `#/profile/artist/${user.id}`">
          <v-icon size="100" color="white">fas fa-user</v-icon>
        </a>
        <h2 v-if="user.type === 'user'" class="white-title center">{{ user.firstname }}<br>{{ user.lastname }}</h2>
        <h2 v-else class="white-title center">{{ user.artistName }}</h2>
        <v-btn 
          elevation="0"
          color="black"
          rounded
          class="white--text cta-button"
          min-width="184"
          max-width="184"
          @click="logout"
        >Logout</v-btn>
      </div>
    </div>
    <div v-if="user.type === 'user'" class="main-nav__below">
      <router-link to="/artists">All artists</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/following">Following</router-link>
      <router-link to="/carpool">Carpool</router-link>
    </div>
    <div v-else class="main-nav__below">
      <router-link to="/events">Events</router-link>
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue';
import Button from '@/components/Button.vue';
import store from "@/store";
import { getUser } from '@/services/users';

export default Vue.extend({
  name: 'Navigation',
  props: {

  },
  data: () => ({
    user: {},
  }),
  async mounted() {
    this.user = await getUser();
  },
  computed: {
    openMenu() {
      return store.getters.getMenuStatus;
    }
  },
  components: {
    Button
  },
  methods: {
    closeMenu() {
      store.dispatch('commitMenuStatus');
    },
    async logout() {
      localStorage.removeItem('token');
      sessionStorage.removeItem('vuex');
      await store.dispatch('commitUser');
      this.$router.replace({name: 'Home'})
    }
  },
});
</script>
