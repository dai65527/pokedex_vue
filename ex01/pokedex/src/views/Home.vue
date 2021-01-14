<template>
  <div class="home">
    <poke-list></poke-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PokeList from '@/components/pokelist.vue';

@Component({
  components: {
    PokeList,
  },
})
export default class Home extends Vue {}
</script>
