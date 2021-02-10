<template>
  <div id="app">
    <v-app>
      <NavBar />
      <v-main 
      :style=" this.$route.path !== '/' ? {
        'background-image': 'url(/pokedex_vue/pokemon_comp_bg.png)',
        'background-repeat': 'repeat',
      } : {}" >
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
