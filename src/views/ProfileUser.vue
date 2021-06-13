<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <div class="profile">
          <div class="profile__above">
            <div class="profile__info">
              <div href="#/">
                <v-icon size="100" color="white">fas fa-user</v-icon>
              </div>
              <h2 class="center">{{ user.firstname }}<br>{{ user.lastname }}</h2>
            </div>
          </div>
        </div>
        <div class="posts">
          <Post v-for="post in posts" :key="post.id" :post="post" :user="user" @likePost="likePost"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';
import Post from '@/components/Post.vue';

import { getPostsUser, likePost, Post as PostData } from '@/services/posts';
import store from '@/store';

export default Vue.extend({
  name: 'ProfileUser',
  data: () => ({
    posts: [] as PostData[],
    user: {} as any,
    
  }),
  components: {
    InputField,
    Button,
    Card,
    Post
  },
  async mounted() {
    this.user = store.getters.getUser;
    this.posts = await getPostsUser();
    this.sortPosts();
  },
  methods: {
    async likePost(args: { postId: string }) {
      await likePost(args.postId);
      this.posts = await getPostsUser();
      this.sortPosts();
    },
    sortPosts() {
      this.posts.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1);
    },
  },
});

</script>
