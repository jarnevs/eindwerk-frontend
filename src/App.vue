<template>
  <v-app>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
@import '@/scss/main';
</style>
