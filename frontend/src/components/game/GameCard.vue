<template>
  <div>
    <div class="card" style="max-width: 20rem;">
        <img class="card-img-top" :src="getImagePath()">
        <div class="card-body">
            <h5 class="card-title">{{ game.name }}</h5>
            <p class="card-text">{{ game.desc }}</p>
            <router-link :to="{ name: 'game', params: { id: game.id } }">
                <button class=" btn btn-primary">Detalhes</button>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'

export default {
  name: 'GameCard',
  props: ['game'],
  methods: {
    getImagePath() {
      return `${baseApiUrl}/uploads/${this.game.image}`
    }
  }
};
</script>
<style scoped>
  .card {
    margin-top: 15px;
  }
</style>