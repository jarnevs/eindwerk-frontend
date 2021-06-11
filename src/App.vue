<template>
  <v-app>
    <Header :isLoggedIn="checkLoggedIn" />
    <v-container v-if="checkLoggedIn">
      <v-row>
        <v-col
          cols="12"
          md="3"
          lg="2"
          class="main-nav" 
          :class="openMenu ? 'open' : ''"
        >
          <Navigation />
        </v-col>
        <v-col
          cols="12"
          md="9"
          lg="10"
          class="cancel-padding custom-column-md"
        >
          <router-view />
        </v-col>
      </v-row>
    </v-container>
    <router-view v-else />
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import Header from "@/components/layout/Header.vue";
import Navigation from "@/components/layout/Navigation.vue";
import store from "@/store";

export default Vue.extend({
  data: () => ({
    isLoggedIn: true,
  }),
  computed: {
    checkLoggedIn() {
      return store.getters.getIsLoggedIn;
    },
    openMenu() {
      return store.getters.getMenuStatus;
    }
  },
  components: {
    Header,
    Navigation,
  },
  methods: {
    closeMenu() {
      store.dispatch('commitMenuStatus');
    }
  },
});
</script>

<style lang="scss">
@import "@/scss/main";
</style>
