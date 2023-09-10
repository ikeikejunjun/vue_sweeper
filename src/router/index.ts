import Vue from 'vue'
import { createRouter,createWebHistory } from 'vue-router';


import Game from '@/components/pages/Game.vue';
import Setting from '@/components/pages/Setting.vue';
const routes = [
  { path: '/:width?/:height?/:mine?', component: Game},
  { path: '/Setting/:width/:height/:mine', component: Setting},
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // HTML5 History モード
  routes,
})
export default router