<template>
  <div id="app">
    <v-app>
      <NavBar />
      <v-main :class="this.$route.path !== '/' ? 'poke_comp_bg' : ''">
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

<style scoped>
.poke_comp_bg {
  background-image: url("~@/assets/pokemon_comp_bg.png");
}
</style>
