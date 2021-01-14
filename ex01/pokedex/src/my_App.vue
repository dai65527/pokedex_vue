<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
    Pokedex
    </v-app-bar>

  <v-main>
    <div id="app">
      <router-view/>
      </div>
  </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
