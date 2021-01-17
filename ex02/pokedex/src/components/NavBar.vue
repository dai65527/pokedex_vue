<template>
  <v-app-bar app color="red" dark
    ><div><v-img :src="require('@/assets/pokedex_logo.png')"></v-img></div
  ></v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NavBar extends Vue {}
</script>
