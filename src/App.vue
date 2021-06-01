<template>
  <v-app>
    <Header />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import Header from '@/components/layout/Header.vue';

export default Vue.extend({
  components: {
    Header,
  }
})
</script>

<style lang="scss">
@import '@/scss/main';
</style>
