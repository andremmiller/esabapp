<template>
  <div>
    <h1>Lista de jogos</h1>
        <!-- Add an input field for the search bar -->
        <input v-model="searchText" type="text" placeholder="Pesquisar jogo" class="form-control mb-2" />
        <div class="row">
          <div v-for="game in filteredGames" :key="game.id" class="card-wrapper col-sm-6 col-md-3">
            <GameCard :game="game" />
          </div>
        </div> 
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import GameCard from './GameCard'

export default {
  name: 'GameList',
  components: {GameCard},
  data() {
    return {
      games: null,
      searchText: ''
    };
  },
  computed: {
    ...mapState(['user']),
    // Create a computed property to filter games based on searchText
    filteredGames() {
      const search = this.searchText.toLowerCase();
      return search.length < 3 ? this.games : this.games.filter(game => game.name.toLowerCase().includes(search));
    }
  }, 
  methods: {
    
  },
  mounted() {
    const url = window.location.pathname.includes('owned') ? `${baseApiUrl}/owned/games` : `${baseApiUrl}/games/`
    axios.get(url).then(res => this.games = res.data)       
  }
};
</script>
<style scoped>

</style>