<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <Post :post="post" :comments="comments" detail=true :user="user" @updateInputValue="updateInputValue" @createPost="createPost" @likePost="likePost"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TextArea from '@/components/TextArea.vue';
import Button from '@/components/Button.vue';
import Post from '@/components/Post.vue';
import store from '@/store';

import { getPost, getComments, createPost, likePost, Post as PostData } from '@/services/posts';

export default Vue.extend({
  name: 'PostDetail',
  data: () => ({
    post: {} as PostData,
    message: '',
    comments: [] as PostData[],
    user: {},
  }),
  components: {
    Button,
    Post,
    TextArea,
  },
  async mounted() {
    this.post = await getPost(this.$route.params.id);
    this.comments = await getComments(this.$route.params.id);
    this.sortPosts();
    this.mapComments();
    this.user = await store.getters.getUser;
    console.log(this.comments);
  },
  methods: {
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async createPost() {
      console.log('got it in Detail')
      await createPost(
        {
          message: this.message,
          artistId: this.post.artist.id,
        },
        this.post.id
      )

      this.comments = await getComments(this.$route.params.id);
      this.sortPosts();
      this.mapComments();
      this.message = '';
    },
    sortPosts() {
      this.comments.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1);
    },
    mapComments() {
      this.comments = this.comments.map((comment) => ({
        ...comment,
        postDate: this.formatDate(comment.createdOn),
      }))
    },
    formatDate(createdOn: number): string {
      const date = new Date(createdOn);
      const dateString = date.toLocaleDateString('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      return dateString.split(', ').join(' - ');
    },
    async likePost(args: {postId: string}) {
      this.post = await likePost(args.postId);
    }
  },
});

</script>
