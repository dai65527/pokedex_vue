<template>
  <v-menu v-if="!isRetroPage" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="amber lighten-1"
        class="blue-grey--text"
        rounded
        v-bind="attrs"
        v-on="on"
      >
        <span v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
          {{ langDisplayName }}
        </span>
        <v-icon dense>mdi-earth</v-icon>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Language, languageNameMap } from "@/models/language";

@Component({
  components: {},
})
export default class LangMenu extends Vue {
  private langNameMap = languageNameMap;
  private selectedLanguageIndex = 0;

  get langDisplayName() {
    return this.langNameMap.get(this.$store.state.language);
  }

  get isRetroPage(): boolean {
    if (!this.$route.path.indexOf("/pokemonRetro")) {
      return true;
    } else return false;
  }

  changeLanguage(lang: Language) {
    this.$store.commit("changeLanguage", lang);
  }
}
</script>
