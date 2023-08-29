import Vue from 'vue'
import { createRouter,createWebHistory } from 'vue-router';


import Game from '@/components/pages/Game.vue';    /*後ほど作成するファイルです*/
import HelloWorld from '@/components/HelloWorld.vue';  /*後ほど作成するファイルです*/

const routes = [
  { path: '/Game', component: Game },
  { path: '/HelloWorld', component: HelloWorld }
]
const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
})
export default router