<template>
  <div class="home-page">
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          md="8"
          lg="6" 
        >
          <h1 class="text-center">Connect with artists,<br>new people and a whole new family.</h1>
          <div class="errors-form">
            <p v-if="error">{{error}}</p>
          </div>
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
            <Button text="Login" type="submit" color="cta"/>
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
            <Button text="Create account" href="#/register" color="cta"/>
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
            <Button text="Create artist account" href="#/register-artist" color="cta"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import store from '@/store';

import { loginUser } from '@/services/users';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    email: '',
    password: '',
    error: '',
  }),
  components: {
    InputField,
    Button
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
      console.log(result);

      if (!!result.statusCode) {
        this.error = result.message;
      } else {
        localStorage.setItem('token', result.accesToken);
        store.dispatch('commitLoginStatus', { status: true });
        await store.dispatch('commitUser');
        this.$router.push({ name: 'Artists' })
      }

    }
  },
});

</script>
