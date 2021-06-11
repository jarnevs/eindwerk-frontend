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
          <h1 class="text-center">Register artist</h1>
          <div class="errors-form">
            <p v-for="error in errors" :key="error">{{error}}</p>
          </div>
          <v-form @submit.prevent="register" class="auth-form">
            <InputField
              type="email"
              placeholder="Email"
              id="email"
              @updateValue="updateInputValue($event)"
            />
            <InputField
              type="text"
              placeholder="Artist name"
              id="artistName"
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
            <InputField
              type="text"
              placeholder="Genre"
              id="genre"
              @updateValue="updateInputValue($event)"
            />
            <TextArea 
              id="description"
              placeholder="Description" 
              @updateValue="updateInputValue($event)"
              extraClass="form-group__input--textarea-register"
            />
            <Button text="Create account" type="submit" color="cta"/>
          </v-form>
        </v-col>
      </v-row>  
    </v-container>
  </div>   
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue'; // @ is an alias to /src
import TextArea from '@/components/TextArea.vue'; // @ is an alias to /src

import { registerUser, loginUser } from '@/services/users';

export default Vue.extend({
  name: 'RegisterArtist',
  data: () => ({
    errors: [] as string[],
    email: '',
    artistName: '',
    password: '',
    confirmPassword: '',
    genre: '',
    description: '',
  }),
  components: {
    InputField,
    Button,
    TextArea,
  },
  methods: {
    validateForm () {
      this.errors = [];
      if (this.email.trim() === '') {
        this.errors.push('Email can\'t be empty');
      } else {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!re.test(this.email)) this.errors.push('Email is not valid');
      }

      if (this.artistName.trim() === '') this.errors.push('Artist name can\'t be empty');

      if (this.password.length < 8) {
        this.errors.push('Password should be at least 8 characters');
      } else {
        if (this.password !== this.confirmPassword) this.errors.push('Passwords don\'t match');
      }

      if (this.genre.trim() === '') this.errors.push('Genre can\'t be empty');
      if (this.description.trim() === '') this.errors.push('Description can\'t be empty');

      return this.errors.length <= 0;
    },
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async register() {
      const isValid = this.validateForm();

      if (isValid) {
        const data = {
          email: this.email,
          artistName: this.artistName,
          password: this.password,
          genre: this.genre.toLowerCase(),
          description: this.description,
          type: 'artist',
        };
  
        const result = await registerUser(data);

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
