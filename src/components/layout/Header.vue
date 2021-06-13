<template>
  <header>
    <v-container>
      <v-row 
        align="center"
      >
        <v-col
          cols="6"
          md="6"
          lg="6"
        >
          <div class="header-logo">
            <a class="header-logo__container" :href="isLoggedIn ? '#/posts' : '#/'">
              <img 
                src="@/assets/logo.svg"
              />
            </a>
          </div>
        </v-col>
        <v-col
          v-if="isLoggedIn"
          cols="6"
          md="6"
          lg="6"
        >
          <div class="header-nav">
            <a href="" class="header-nav__icon">
              <v-icon size="26" color="white">fas fa-search</v-icon>
            </a>
            <a href="" class="header-nav__icon hide-icon" @click.prevent="openMenu">
              <v-icon size="26" color="white">fas fa-user</v-icon>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>
<script lang="ts">
import Vue from 'vue';
import store from "@/store";

export default Vue.extend({
  name: 'Header',
  props: {
    isLoggedIn: Boolean,
  },
  methods: {
    openMenu() {
      store.dispatch('commitMenuStatus');
    }
  },
});
</script>
