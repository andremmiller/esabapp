<template>
  <div>
    <h1>Lista de jogos</h1>
    <router-link :to="{ name: 'gameAdd'}">
        <button type="button" class="btn btn-success">Novo Jogo</button>
    </router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Descricao</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="game in games" :key="game.id">
                <td>{{ game.id }}</td>
                <td>{{ game.name }}</td>
                <td>{{ game.desc }}</td>
                <td>
                    <router-link :to="{ name: 'gameUpdate', params: { id: game.id } }">
                        <button type="button" class="btn btn-primary">Editar</button>
                    </router-link>
                    <router-link :to="{ name: 'gameUploadImg', params: { id: game.id } }">
                        <button type="button" class="btn btn-success">Alterar imagem</button>
                    </router-link>
                    <button type="button" class="btn btn-danger" @click="deleteGame(game.id)">Excluir</button> 
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'UserGames',
  data() {
    return {
      games: null,
    };
  },
  methods: {
    deleteGame(gameId) {
      const url = `${baseApiUrl}/games/${gameId}`
      axios.delete(url).then(_ => {
        this.$toasted.global.defaultSuccess()
        const url = `${baseApiUrl}/owned/games`
        axios.get(url).then(res => this.games = res.data)
      }).catch(err => console.log(err))
    }
  },
  mounted() {
    const url = `${baseApiUrl}/owned/games`
    axios.get(url).then(res => this.games = res.data)       
  }
};
</script>
<style scoped>
.btn {
  margin-left: 10px
}
</style>