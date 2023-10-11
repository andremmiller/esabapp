<template>
  <div>
    <h1>Detalhe do jogo</h1>
        <b-card
            :title="game ? game.name : null"
            :img-src="getImagePath()"
            img-top
            tag="article"
            style="max-width: 50rem;"
            class="mb-2"
        >
            <b-card-text>
                {{ game ? game.desc : null }}
                <div class="info">
                  <div><span>Proprietário: </span>{{ game ? game.userName: '' }}</div>
                  <div><span>Contato: </span> {{ game ? game.userMail + ' | ' + game.userPhone : '' }}</div>
                </div>
            </b-card-text>
            <LoanForm :game="game" />
        </b-card>

        
  </div>
  
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import LoanForm from "../loan/LoanForm.vue"

export default {
  name: 'Game',
  components: { LoanForm },
  computed: mapState(['user']),
  data() {
    return {
      game: null,
      showLoanForm: false
    };
  }, 
  methods: {
    getImagePath() {
      return this.game ? `${baseApiUrl}/uploads/${this.game.image}` : ''
    }
  },
  mounted() {
    if(this.$route.params.id) {
      const url = `${baseApiUrl}/games/${this.$route.params.id}`
      axios.get(url).then(res => this.game = res.data)
    }       
  }
};
</script>
<style scoped>
.info {
  margin: 20px 0px 20px 0px;
}

.info span {
  font-weight: bold;
}
</style>