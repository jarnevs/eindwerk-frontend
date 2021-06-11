<template>
  <div>
    <div class="hero-mobile">
      <div class="hero-mobile__image">
        <img src="@/assets/band.jpg" alt="">
      </div>
      <div class="hero-mobile__info">
        <h1>{{ this.artist.artistName }}</h1>
        <v-btn
            elevation="0"
            color="cta"
            rounded
            class="white--text cta-button hide-button"
            min-width="102"
            max-width="102"
            id="description"
            @click="togglePopUp($event)"
        >More info</v-btn>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="hero-large">
            <div class="hero-large__image">
              <img src="@/assets/band.jpg" alt="">
            </div>
            <div class="hero-large__info">
              <h1>{{ this.artist.artistName }}</h1>
              <v-btn
                  elevation="0"
                  color="cta"
                  rounded
                  class="white--text cta-button"
                  min-width="102"
                  max-width="102"
                  @click="togglePopUp"
              >More info</v-btn>
            </div>
          </div>
          
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="page-nav">
            <ul class="page-nav__container">
              <li class="page-nav__item">
                <a 
                  id="artist"
                  class="page-nav__link"
                  :class="selectedItem === 'artist' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Artist
                </a>
              </li>
              <li class="page-nav__item">
                <a 
                  id="users"
                  class="page-nav__link"
                  :class="selectedItem === 'users' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Users
                </a>
              </li>
              <li class="page-nav__item">
                <a
                  id="events"
                  class="page-nav__link"
                  :class="selectedItem === 'events' ? ' page-nav__link--selected' : ''"
                  @click="changeSelectedItem($event)">
                  Events
                </a>
              </li>
            </ul>
          </div>
          <div v-if="selectedItem === 'artist'" class="posts">
            <v-btn
              v-if="user.type === 'artist'"
              elevation="0"
              color="cta"
              rounded
              class="white--text cta-button hide-button"
              min-width="100%"
              max-width="100%"
              id="post-artist"
              @click="togglePopUp($event)"
            >New post</v-btn>
            <div class="cards">
              <Post v-for="post in postsArtist" :key="post.id" :post="post" type="artist" :user="user" @likePost="likePost"/>
            </div>
          </div>
          <div v-else-if="selectedItem === 'users'" class="posts">
            <v-btn
              v-if="user.type === 'user'"
              elevation="0"
              color="cta"
              rounded
              class="white--text cta-button hide-button"
              min-width="100%"
              max-width="100%"
              id="post-user"
              @click="togglePopUp($event)"
            >New post</v-btn>
            <div class="cards">
              <div class="cards">
                <Post v-for="post in postsUsers" :key="post.id" :post="post" type="artist" :user="user" @likePost="likePost"/>
              </div>
            </div>
          </div>
          <div v-else>
            <v-btn
              v-if="user.type === 'artist'"
              elevation="0"
              color="cta"
              rounded
              class="white--text cta-button hide-button"
              min-width="100%"
              max-width="100%"
              id="event"
              @click="togglePopUp($event)"
            >New event</v-btn>
            <div class="cards"></div>
          </div>
          <div class="pop-up" v-if="showPopUp">
            <div class="pop-up__content">
              <div class="filter__close pop-up__close">
                <button @click="togglePopUp"><v-icon size="32" color="black">fas fa-times</v-icon></button>
              </div>
              <div v-if="popUpFor === 'description'">
                <p>{{ artist.description }}</p>
              </div>
              <v-form method="post" v-else-if="popUpFor === 'post'" class="pop-up__form" @submit.prevent="createPost">
                <TextArea 
                  id="message"
                  placeholder="Write what's on your mind..." 
                  @updateValue="updateInputValue($event)"
                  extraClass="form-group__input--textarea-post"
                />
                <Button text="Create post" type="submit" color="cta"/>
              </v-form>
              <v-form v-else>
                hallo
              </v-form>
            </div>
          </div>
          <div class="pop-up-overlay" v-if="showPopUp"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TextArea from '@/components/TextArea.vue';
import Button from '@/components/Button.vue';
import Post from '@/components/Post.vue';

import { getArtist } from '@/services/users';
import { getPostsArtist, createPost, likePost, Post as PostData } from '@/services/posts';
import store from '@/store';

export default Vue.extend({
  name: 'Artist',
  data: () => ({
    artist: {} as {id: string, artistName: string, genre: string, desciprtion:string},
    selectedItem: "artist",
    user: {},
    posts: [] as PostData[],
    postsUsers: [] as PostData[],
    postsArtist: [] as PostData[],
    showPopUp: false,
    popUpFor: '',
    message: '',
  }),
  components: {
    Post,
    TextArea,
    Button,
  },
  async mounted() {
    this.artist = await getArtist(this.$route.params.id);
    this.user = store.getters.getUser;
    console.log(this.user);
    this.posts = await getPostsArtist(this.$route.params.id);
    this.filterPosts();
  },
  methods: {
    async changeSelectedItem(e: InputEvent) {
      const element = e.target as HTMLAnchorElement;
      const { id } = element;

      this.selectedItem = id;
    },
    async updateInputValue(args: [string, string]) {
      const [id, value] = args;
      this.$data[id] = value;
    },
    async createPost() {
      await createPost(
        {
          message: this.message,
          artistId: this.artist.id,
        }
      )

      this.posts = await getPostsArtist(this.$route.params.id);
      console.log(this.posts);
      this.filterPosts();

      this.message = '';
      this.popUpFor = '';
      this.showPopUp = !this.showPopUp;
    },
    togglePopUp(e: Event) {
      if (this.popUpFor !== '') {
        this.popUpFor = '';
        return this.showPopUp = !this.showPopUp;
      }

      const target = e.target as HTMLElement;
      const parentElement = target.parentElement;

      let id = target.id || parentElement?.id;

      if (id === 'post-artist' || id === 'post-user') {
        this.popUpFor = 'post';
      } else if (id === 'description') {
        this.popUpFor = 'description';
      } else {
        this.popUpFor = 'event';
      }
      
      this.showPopUp = !this.showPopUp
    },
    filterPosts() {
      this.sortPosts();
      this.postsUsers = this.posts.filter((post) =>  post.user.id !== post.artist.id );
      this.postsArtist = this.posts.filter((post) => post.user.id === post.artist.id );
    },
    sortPosts() {
      this.posts.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1);
    },
    async likePost(args: { postId: string }) {
      await likePost(args.postId);
      this.posts = await getPostsArtist(this.$route.params.id);
      this.filterPosts();
    }
  },
});

</script>
