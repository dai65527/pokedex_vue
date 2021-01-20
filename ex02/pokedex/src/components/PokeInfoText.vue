<template>
  <v-row class="ma-auto">
    <v-spacer />
    <v-col cols="4" >
      <span class="text-center font-weight-bold grey--text text--darken-2">{{ this.title }}:</span>
    </v-col>
    <v-col cols="6" >
      <span class="text-center font-weight-bold grey--text text--darken-2">{{ this.value }}</span>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class PokeInfoText extends Vue {
  @Prop()
  private title!: string;
  @Prop()
  private value!: string;
}
</script>
