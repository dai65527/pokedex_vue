<template>
  <div>
    <v-btn
      v-if="isDisplayRetroBtn"
      color="amber lighten-1"
      class="blue-grey--text"
      rounded
      :to="{ name: 'pokemonRetro', params: { id: this.$route.params.id } }"
    >
      <span v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
        Retro
      </span>
      <v-icon dense>mdi-clock-outline</v-icon>
    </v-btn>
    <v-btn
      v-if="isDisplayModernBtn"
      color="amber lighten-1"
      class="blue-grey--text"
      rounded
      :to="{ name: 'pokemon', params: { id: this.$route.params.id } }"
    >
      <span v-if="$vuetify.breakpoint.mdAndUp" class="mr-1">
        Modern
      </span>
      <v-icon dense>mdi-clock-outline</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { POKERETRO_MAX } from "@/models/pokeRetro.ts";

@Component({
  components: {},
})
export default class RetroButton extends Vue {
  get isDisplayRetroBtn(): boolean {
    if (!this.$route.path.indexOf("/pokemon/")) {
      const id = parseInt(this.$route.params.id);
      if (id > 0 && id <= POKERETRO_MAX) return true;
    }
    return false;
  }

  get isDisplayModernBtn(): boolean {
    if (!this.$route.path.indexOf("/pokemonRetro/")) {
      return true;
    }
    return false;
  }
}
</script>
