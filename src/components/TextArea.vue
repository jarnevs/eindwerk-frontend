<template>
  <div class="form-group">
    <textarea
      :id="id"
      :width="width"
      :height="height"
      :placeholder="placeholder"
      @input="updateValue" 
      :class="`${initClass} ${extraClass}`  "
    ></textarea>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    id: String,
    width: String,
    height: String,
    placeholder: String,
    extraClass: String,
  },
  data: () => ({
    initClass: 'form-group__input',
  }),
  methods: {
    updateValue(e: InputEvent) {
      const element = e.target as HTMLInputElement;

      const { value } = element;
      this.$emit('updateValue', [
        this.id,
        value,
      ]);
    },
  },
});
</script>