<template>
  <div>
    <h1>Detalhe do jogo</h1>
        <b-card
            :title="game ? game.name : null"
            img-src="https://picsum.photos/600/300/?image=25"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                {{ game ? game.desc : null }}
            </b-card-text>

            <b-button href="#" variant="primary">Solicitar empréstimo</b-button>

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
      game: null
    };
  }, 
  methods: {
    
  },
  mounted() {
    if(this.$route.params.id) {
      const url = `${baseApiUrl}/games/${this.$route.params.id}`
      axios.get(url).then(res => this.game = res.data)
    }       
  }
};
</script>