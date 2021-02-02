<template>
  <v-container>
    <v-card
      class="mx-auto"
      width="500px"
      height="500px"
      img="/retroBg_white.png"
    >
      <v-row no-gutters>
        <v-col class="ma-4">
          <v-row no-gutters>
            <v-col class="mt-6"></v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="mt-11">
              <v-img
                :src="pokeRetro.imageUrl"
                :alt="pokeRetro.name"
                height="150"
                contain
              />
              <div
                class="font-weight-bold display-1 text-center mt-1"
                :style="{'font-family': 'Myfont'}"
              >
                No.{{ pokeRetro.id }}
              </div>
            </v-col>
            <v-col cols="6" class="mt-3">
              <v-row>
                <v-col class="my-2">
                  <span class="font-weight-bold" :style="'v-application'">{{
                    pokeRetro.name
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-2">
                  <span class="font-weight-bold">{{
                    pokeRetro.genus
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-2">
                  <span class="font-weight-bold">たかさ </span>
                  <span class="font-weight-bold"
                    >{{ pokeRetro.height }}m</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col class="my-2">
                  <span class="font-weight-bold">おもさ </span>
                  <span class="font-weight-bold"
                    >{{ pokeRetro.weight }}kg</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="ma-8 pt-6">
              <span class="font-weight-bold">{{
                pokeRetro.flavorText
              }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PokeRetro, {
  emptyPokeRetro,
  fetchPokeRetroById,
} from "@/models/pokeRetro";
import "@/assets/sass/style.scss";
@Component({
  components: {},
})
export default class PokemonRetro extends Vue {
  private id: number = parseInt(this.$route.params.id);
  private pokeRetro: PokeRetro = emptyPokeRetro;
  private isLoading = true;
  private msgLoading = "Loading...";

  async fetch() {
    this.pokeRetro = await fetchPokeRetroById(this.id, "ja-Hrkt").catch(
      (err: Error) => {
        this.msgLoading = err.message;
        this.isLoading = false;
        return emptyPokeRetro;
      }
    );
    if (this.pokeRetro !== emptyPokeRetro) {
      this.isLoading = false;
    }
  }

  async mounted() {
    await this.fetch();
  }
}
</script>

