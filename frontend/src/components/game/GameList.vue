<template>
  <div>
    <h1>Lista de jogos</h1>
        <b-card v-for="game in games" :key="game.id"
            :title="game.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                {{ game.desc }}
            </b-card-text>

            <router-link :to="{ name: 'game', params: { id: game.id } }">
                <b-button variant="primary">Detalhes</b-button>
            </router-link>
        </b-card>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'GameList',
  computed: mapState(['user']),
  data() {
    return {
      games: null
    };
  }, 
  methods: {
    
  },
  mounted() {
    const url = window.location.pathname.includes('owned') ? `${baseApiUrl}/owned/games` : `${baseApiUrl}/games/`
    axios.get(url).then(res => this.games = res.data)       
  }
};
</script>