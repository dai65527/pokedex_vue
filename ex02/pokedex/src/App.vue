<template>
  <div id="app">
    <v-app>
      <!-- navbar is to be componented -->
      <v-app-bar app color="red" dark
        ><div><v-img :src="require('@/assets/pokedex_logo.png')"></v-img></div
      ></v-app-bar>
      <!-- navbar is to be componented -->
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
