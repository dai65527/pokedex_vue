<template>
  <v-dialog v-if="isPokeList" v-model="dialog" scrollable max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="amber lighten-1"
        class="blue-grey--text"
        rounded
        v-bind="attrs"
        v-on="on"
      >
        Search
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Search</v-card-title>
      <v-divider></v-divider>
      <v-text-field class="mx-auto"></v-text-field>
      <v-divider></v-divider>
      <v-card-title>Filter</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <v-radio-group v-model="dialogm1" column>
          <v-radio
            v-for="item in pokeTypes"
            :key="item.id"
            :label="item.name"
            :value="item.nameEn"
          />
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PokeType, { fetchPokeTypesInLang } from "@/models/pokeType";
import { Language } from "@/models/language";

@Component({})
export default class SearchMenu extends Vue {
  private isPokeList: boolean = true;
  private pokeTypes: PokeType[] = [];

  get language(): Language {
    return this.$store.state.language;
  }

  async fetch() {
    fetchPokeTypesInLang(this.language)
      .then((ary) => (this.pokeTypes = ary))
      .catch();
  }

  created() {
  }

  @Watch("$route")
  isPokelistPage() {
    if (this.$route.path == "/") this.isPokeList = true;
    else this.isPokeList = false;
  }

  @Watch("language")
  reset() {
    fetchPokeTypesInLang(this.language)
      .then((ary) => (this.pokeTypes = ary))
      .catch();
  }
}
</script>
