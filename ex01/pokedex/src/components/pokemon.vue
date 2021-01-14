<template>
<div
  style="display: inline-block; _display: inline;"
  v-if="isInPokedexRange"
>

  <div v-show="isLoading">
  </div>

  <div v-show="!isLoading">
    <img
      :src=sprite
      :style="{ width: '130px'}">
    <p>{{name}}</p>
  </div>

</div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import axios from 'axios';

  @Component({components: {}})
  export default class Pokemon extends Vue {

  @Prop(String) private uri!: string;

  private name: string = '';
  private sprite: string = '';
  private spriteUri: string = '';
  private specesUri: string = '';
  private isInPokedexRange: boolean = true;
  private isLoading: boolean = true;

  private fetchPokeItem(uri: string) {
    axios.get(this.uri)
    .then((res) => {
      this.spriteUri = res.data.sprites.other['official-artwork'].front_default;
      this.specesUri = res.data.species.url;
      if (!(1 <= res.data.id && res.data.id <= 898)) {
        this.isInPokedexRange = false;
      } else {
        this.isInPokedexRange = true;
      }
    })
    .then(() => {
      Promise.all([
        axios.get(this.spriteUri, {responseType: 'blob'})
        .then((res) => this.sprite = URL.createObjectURL(res.data)),
        axios.get(this.specesUri)
        .then((res) => {
          this.name = res.data.names.find((item: any) => {
            return (item.language.name === 'ja'); }).name; },
        ),
      ])
      .then(() => {
        this.isLoading = false;
      });
    });
  }

  @Watch('uri')
  private onChangeUri(): void {
    this.isLoading = true;
    this.fetchPokeItem(this.uri);
  }

  private created() {
    this.fetchPokeItem(this.uri);
  }
}
</script>