<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p class="blue">{{ msg }}</p>
    <form @submit.prevent="register">
      <InputField
        type="text"
        placeholder="Firstname"
        id="firstname"
        @updateValue="updateInputValue($event)"
      />
      <InputField
        type="text"
        placeholder="Lastname"
        id="lastname"
        @updateValue="updateInputValue($event)"
      />
      <InputField
        type="email"
        placeholder="Email"
        id="email"
        @updateValue="updateInputValue($event)"
      />
      <InputField
        type="password"
        placeholder="Password"
        id="password"
        @updateValue="updateInputValue($event)"
      />
      <input type="submit" />
    </form>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import { registerUser, loginUser } from '@/services/users';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    msg: 'Hello!',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    emailLogin: '',
    passwordLogin: '',
  }),
  components: {
    InputField,
    HelloWorld,
  },
  methods: {
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async register() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };

      const result = await registerUser(data);
    },
    async login() {
      const data = {
        username: this.emailLogin,
        password: this.passwordLogin,
      }

      const result = await loginUser(data);
    }
  },
});

</script>
