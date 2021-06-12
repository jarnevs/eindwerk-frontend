import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import RegisterUser from '../views/RegisterUser.vue';
import RegisterArtist from '../views/RegisterArtist.vue';
import Artists from '../views/Artists.vue';
import Following from '../views/Following.vue';
import Artist from '../views/Artist.vue';
import PostDetail from '../views/PostDetail.vue';
import Events from '../views/Events.vue';
import Event from '../views/Event.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    
    component: RegisterUser,
  },
  {
    path: '/register-artist',
    name: 'Register Artist',
    component: RegisterArtist,
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists,
  },
  {
    path: '/following',
    name: 'Following',
    component: Following,
  },
  {
    path: '/artists/:id',
    name: 'Artist',
    component: Artist,
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: PostDetail,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/events/:id',
    name: 'Event',
    component: Event,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
