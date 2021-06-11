<template>
  <v-btn 
    :type="type"
    elevation="0"
    :color="color"
    rounded
    class="white--text cta-button"
    min-width="184"
    max-width="184"
    :href="href !== '' ? href : undefined"
  >{{ text }}</v-btn>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    type: String,
    text: String,
    href: String,
    color: String,
    click: Function,
  },
});
</script>
