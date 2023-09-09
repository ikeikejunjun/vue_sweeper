<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Game from './components/pages/Game.vue'; 
import Setting from './components/pages/Setting.vue'; 
import './assets/style.css';

@Options({
  components: {
    HelloWorld,
    Game,
    Setting,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
