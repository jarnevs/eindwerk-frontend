<template>
<div class="form-group">
  <input :id="id" :type="type" :placeholder="placeholder" @input="updateValue" class="form-group__input" :value="value" required :disabled="value ? true : false">
</div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InputField',
  props: {
    id: String,
    placeholder: String,
    type: String,
    value: String,
  },
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
