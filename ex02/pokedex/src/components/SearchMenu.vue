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
        <span v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
          Search
        </span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Search</v-card-title>
      <v-divider></v-divider>
      <v-text-field class="mx-auto" v-model="searchString"></v-text-field>
      <v-divider></v-divider>
      <v-card-title>Filter</v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="!isLoading" style="height: 300px;">
        <v-radio-group v-model="typeFilter" column>
          <v-radio
            v-for="item in pokeTypes"
            :key="item.id"
            :label="item.name"
            :value="item.nameEn"
          />
        </v-radio-group>
      </v-card-text>
      <v-card-text v-if="isLoading">{{ messageNotLoaded }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="amber lighten-1" class="mx-auto" rounded @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn color="amber lighten-1" class="mx-auto" rounded @click="refresh">
          <v-icon>mdi-refresh</v-icon>
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
  private pokeTypes: PokeType[] = [];
  private dialog = false;
  private typeFilter = "None";
  private searchString = "";
  private isLoading = true;
  private messageNotLoaded = "Loading...";

  get language(): Language {
    return this.$store.state.language;
  }

  get isPokeList(): boolean {
    if (this.$route.path === "/") {
      return true;
    } else return false;
  }

  private async fetch() {
    fetchPokeTypesInLang(this.language)
      .then(ary => {
        this.pokeTypes = ary;
        this.isLoading = false;
      })
      .catch(err => {
        this.messageNotLoaded = err;
      });
  }

  private refresh() {
    this.typeFilter = "None";
    this.searchString = "";
  }

  private search() {
    this.dialog = false;
    this.$store.commit("changeSearch", this.searchString);
    this.$store.commit("changeTypeFilter", this.typeFilter);
  }

  async created() {
    await this.fetch();
  }

  @Watch("$route")
  isPokelistPage() {
    this.typeFilter = this.$store.state.typeFilter;
    this.searchString = this.$store.state.search;
  }

  @Watch("language")
  async langReset() {
    this.isLoading = true;
    await this.fetch();
  }
}
</script>
