<template>
  <v-row>
    <v-spacer />
    <v-col cols="5">
      <v-card-text class="font-weight-bold display-1">{{ this.row }}:</v-card-text>
    </v-col>
    <v-col cols="5">
      <v-card-text class="font-weight-bold display-1">{{ this.column }}</v-card-text>
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
