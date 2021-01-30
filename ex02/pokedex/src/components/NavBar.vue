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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="amber lighten-1"
            class="blue-grey--text"
            rounded
            v-bind="attrs"
            v-on="on"
          >
            {{ langDisplayName }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>LANGUAGE</v-subheader>
          <v-list-item-group v-model="selectedLanguageIndex" color="primary">
            <v-list-item
              v-for="[langName, displayName] in Array.from(langNameMap)"
              :key="langName"
            >
              <v-list-item-content @click="changeLanguage(langName)">{{
                displayName
              }}</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Language, languageNameMap } from "@/models/language";
import SearchMenu from "@/components/SearchMenu.vue";

@Component({
  components: {
    SearchMenu,
  }
})
export default class NavBar extends Vue {
  private langNameMap = languageNameMap;
  private selectedLanguageIndex = 0;

  get langDisplayName() {
    return this.langNameMap.get(this.$store.state.language);
  }

  changeLanguage(lang: Language) {
    this.$store.commit("changeLanguage", lang);
  }
}
</script>
