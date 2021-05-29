<template>
  <div class="home">
    <p class="blue">{{ msg }}</p>
    <form @submit.prevent="login">
      <InputField
        type="email"
        placeholder="Email"
        id="emailLogin"
        @updateValue="updateInputValue($event)"
      />
      <InputField
        type="password"
        placeholder="Password"
        id="passwordLogin"
        @updateValue="updateInputValue($event)"
      />
      <input type="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';

import { loginUser } from '@/services/users';

export default Vue.extend({
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  components: {
    InputField,
  },
  methods: {
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async login() {
      const data = {
        username: this.email,
        password: this.password,
      }

      const result = await loginUser(data);
    }
  },
});

</script>
