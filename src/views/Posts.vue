<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <Post v-for="post in posts" :key="post.id" :post="post" :user="user" @likePost="likePost"/>
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

import { getArtists, getUserFollowing } from '@/services/users';
import { getPostsArtist, likePost, Post as PostData } from '@/services/posts';
import store from '@/store';

export default Vue.extend({
  name: 'Posts',
  data: () => ({
    posts: [] as PostData[],
    userFollowing: {} as any,
    user: {} as any
  }),
  components: {
    InputField,
    Button,
    Card,
    Post
  },
  async mounted() {
    this.userFollowing = await getUserFollowing();
    this.user = await store.getters.getUser;
    this.posts = [];
    this.getPosts();
  },
  methods: {
    async likePost(args: { postId: string }) {
      await likePost(args.postId);

      this.posts = [];
      for (const artist of this.user.following) {
        const posts = await getPostsArtist(artist.id);
        this.posts = [...posts, ...this.posts];
      }

      this.sortPosts();
    },
    sortPosts() {
      this.posts.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1);
    },
    async getPosts() {
      this.posts = [];
      if (this.user.type === 'user') {
        for (const artist of this.userFollowing.following) {
          const posts = await getPostsArtist(artist.id);
          this.posts = [...posts, ...this.posts];
        }

      } else {
        this.posts = await getPostsArtist(this.user.id);
      }
      this.sortPosts();
    }
  },
});

</script>
