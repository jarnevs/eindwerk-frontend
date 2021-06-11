<template>
  <div class="home-page">
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="8"
          lg="6" 
        >
          <h1 class="text-center">Register user</h1>
          <div class="errors-form">
            <p v-for="error in errors" :key="error">{{error}}</p>
          </div>
          <form @submit.prevent="register" class="auth-form">
            <div class="form-group-titles">
              <div class="form-group-title" v-for="title in titles" :key="title.value">
                <input type="radio" name="title" :id="title.value" :value="title.value" @change="updateRadioValue" required>
                <label :for="title.value">{{ title.text }}</label>
              </div>
            </div>
            <InputField
              type="email"
              placeholder="Email"
              id="email"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="text"
              placeholder="Lastname"
              id="lastname"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="text"
              placeholder="Firstname"
              id="firstname"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="text"
              placeholder="Phone number"
              id="phone"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="password"
              placeholder="Password"
              id="password"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              @updateValue="updateInputValue($event)"
            />
            <Button text="Create account" type="submit" color="cta"/>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue'; // @ is an alias to /src

import { registerUser, loginUser } from '@/services/users';

export default Vue.extend({
  name: 'RegisterUser',
  data: () => ({
    titles: [
      {
        value: 'mr',
        text: 'Mr'
      },
      {
        value: 'ms',
        text: 'Ms'
      },
      {
        value: 'x',
        text: 'X'
      },
    ],
    errors: [] as string[],
    msg: 'Hello!',
    title: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }),
  components: {
    InputField,
    Button,
  },
  methods: {
    validateForm () : boolean {
      this.errors = []
      if (this.email.trim() === '') {
        this.errors.push('Email can\'t be empty');
      } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!re.test(this.email)) this.errors.push('Email is not valid');
      }

      if (this.lastname.trim() === '') this.errors.push('Lastname can\'t be empty');
      if (this.firstname.trim() === '') this.errors.push('Firstname can\'t be empty');
      if (this.phone.trim() === '') this.errors.push('Phone can\'t be empty');

      if (this.password.length < 8) {
        this.errors.push('Password should be at least 8 characters');
      } else {
        if (this.password !== this.confirmPassword) this.errors.push('Passwords don\'t match');
      }

      return this.errors.length <= 0;
    },
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    updateRadioValue(e: Event) {
      const element = e.target as HTMLInputElement;
      const { value } = element;
      this.title = value;
    },
    async register() {
      const isValid = this.validateForm();

      if (isValid) {
        const data = {
          title: this.title,
          email: this.email,
          lastname: this.lastname,
          firstname: this.firstname,
          phone: this.phone,
          password: this.password,
          type: 'user',
        };

        const result = await registerUser(data);
        console.log(result);

        this.errors = [];

        if (!!result.statusCode && result.statusCode === 409) {
          this.errors.push(result.message);
        } else {
          this.$router.push({ name: 'Home' })
        }
      }
    },
  },
});

</script>
