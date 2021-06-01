<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
        lg="6" 
      >
        <h1 class="text-center">Connect with artists,<br>new people and a whole new family.</h1>
        <v-form @submit.prevent="login" class="auth-form">
          <InputField
            type="email"
            placeholder="Email"
            id="email"
            @updateValue="updateDataValue($event)"
          />
          <InputField
            type="password"
            placeholder="Password"
            id="password"
            @updateValue="updateDataValue($event)"
          />
          <v-btn 
            type="submit"
            elevation="0"
            color="cta"
            rounded
            class="white--text cta-button"
            min-width="184"
            max-width="184"
          >Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
        lg="6" 
      >
        <div class="col__content">
          <h2 class="text-center">No account yet?</h2>
          <v-btn 
            type="submit"
            elevation="0"
            color="cta"
            rounded
            class="white--text cta-button"
            min-width="184"
            max-width="184"
            href="#/register"
          >Create account</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
        lg="6" 
      >
        <div class="col__content">
          <h2 class="text-center">Are you an artist?</h2>
          <v-btn 
            type="submit"
            elevation="0"
            color="cta"
            rounded
            class="white--text cta-button"
            min-width="184"
            max-width="184"
            href="#/register"
          >Create artist account</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';

import { loginUser } from '@/services/users';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    email: '',
    password: '',
  }),
  components: {
    InputField,
  },
  methods: {
    async updateDataValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async login() {
      const data = {
        username: this.email,
        password: this.password,
      }

      const result = await loginUser(data);
      // console.log(result);
    }
  },
});

</script>
