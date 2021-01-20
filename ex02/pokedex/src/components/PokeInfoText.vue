<template>
  <v-row class="ma-auto">
    <v-spacer />
    <v-col cols="4" >
      <span class="text-center font-weight-bold grey--text text--darken-2">{{ this.row }}:</span>
    </v-col>
    <v-col cols="6" >
      <span class="text-center font-weight-bold grey--text text--darken-2">{{ this.column }}</span>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class PokeInfoText extends Vue {
  @Prop()
  private row!: string;
  @Prop()
  private column!: string;
}
</script>
