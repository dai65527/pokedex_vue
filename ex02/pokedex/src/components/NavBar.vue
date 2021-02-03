<template>
  <div>
    <v-app-bar app color="red">
      <div class="mx-2">
        <router-link :to="{ name: 'pokedex' }">
          <v-img
            :src="require('@/assets/pokedex_logo.png')"
            max-height="56"
            max-width="200"
            contain
          ></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <search-menu></search-menu>
      <lang-menu></lang-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchMenu from "@/components/SearchMenu.vue";
import LangMenu from "@/components/LangMenu.vue";

@Component({
  components: {
    SearchMenu,
    LangMenu,
  },
})
export default class NavBar extends Vue {}
</script>
