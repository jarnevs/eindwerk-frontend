<template>
  <div class="post">
    <span v-if="type !== 'artist'" class="post__tag">
      {{ !!post.artist && post.artist.name }}
    </span>
    <div class="post__head">
      <div class="post__head-picture">
        <v-icon size="26" color="black">fas fa-user</v-icon>
      </div>
      <div class="post__head-name">
        <h2 v-if="!!post.user && post.user.firstname !== ''">{{ post.user.firstname }} {{ post.user.lastname }}</h2>
        <h2 v-else>{{ !!post.artist && post.artist.name }}</h2>
        <span>{{ formatDate }}</span>
      </div>
    </div>
    <div class="post__body">
      <p>{{ !!post && post.message }}</p>
    </div>
    <div class="post__footer">
      <a class="post__footer-like" @click="likePost">
        <v-icon size="21" :color="!!post.likedBy && !post.likedBy.includes(user.id) ? 'black' : 'cta'">fas fa-heart</v-icon>
      </a>
      <a :href="`#/posts/${post.id}`" class="post__footer-comment">
        <v-icon size="21" color="black">fas fa-comment-alt</v-icon><span>Comment</span>
      </a>
    </div>
    <div v-if="detail" class="post__create-comment">
      <v-form method="post" @submit.prevent="createPost">
        <TextArea 
          id="message"
          placeholder="Comment" 
          @updateValue="updateInputValue($event)"
          extraClass="form-group__input--textarea-comment"
        />
        <v-btn
          type="submit"
          elevation="0"
          color="cta"
          rounded
          class="white--text cta-button"
          id="event"
        >
          <v-icon size="21" color="color">fas fa-paper-plane</v-icon>
        </v-btn>
      </v-form>
    </div>
    <div v-if="!!comments && comments.length > 0" class="post__comments">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="post__head">
          <div class="post__head-picture">
            <v-icon size="26" color="black">fas fa-user</v-icon>
          </div>
          <div class="post__head-name">
            <h2 v-if="comment.user.firstname !== ''">{{ comment.user.firstname }} {{ comment.user.lastname }}</h2>
            <h2 v-else>{{ comment.artist.name }}</h2>
            <span>{{ comment.postDate }}</span>
          </div>
        </div>
        <div class="post__body">
          <p>{{ comment.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import Vue from 'vue';
import TextArea from '@/components/TextArea.vue';
import { Post } from '@/services/posts';

export default Vue.extend({
  name: 'Post',
  props: {
    post: Object,
    type: String,
    user: Object,
    page: String,
    comments: Array,
    detail: String,
  },
  components:{
    TextArea,
  },
  computed: {
    formatDate() {
      const date = new Date(this.post.createdOn);
      const dateString = date.toLocaleDateString('nl-BE', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      return dateString.split(', ').join(' - ');
    },
  },
  methods: {
    updateInputValue(args) {
      this.$emit('updateInputValue', [
        ...args
      ]);
    },
    createPost() {
      console.log('got it in Post')
      this.$emit('createPost');
    },
    likePost() {
      this.$emit('likePost', { postId: this.post.id });
    }
  }
});
</script>