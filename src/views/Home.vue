<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p class="blue">{{ msg }}</p>
    <form @submit="sendForm">
      <InputField
        type="text"
        placeholder="Firstname"
        id="firstname"
        @updateValue="updateInputValue($event)"
      />
      <InputField type="text" placeholder="Lastname" id="lastname"/>
      <InputField type="email" placeholder="Email" id="email"/>
      <InputField type="password" placeholder="Password" id="password"/>
      <input type="submit" />
    </form>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  data: () => ({
    msg: 'Hello!',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  }),
  components: {
    InputField,
    HelloWorld,
  },
  methods: {
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      console.log(id);
      console.log(value);
    },
    async sendForm() {
      console.log('I send dude');
    },
  },
});

</script>
