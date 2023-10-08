<template>
  <div class="row mb-2">
    <div class="col-md-12">
      <div class="row">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary-emphasis">Empréstimo</strong>
          <h3 class="mb-0">{{ game ? game.name : '' }}</h3>
          <div class="mb-1 text-body-secondary">De: {{ loan ? loan.beginAt : '' }}</div>
          <div class="mb-1 text-body-secondary">Até: {{ loan ? loan.endAt : '' }}</div>
          <p class="card-text mb-auto">{{ game ? game.desc : '' }}</p>
          <div class="mb-1 text-body-secondary">
            <span class="label">Proprietário: </span>
            {{ game ? game.userName : '' }}
          </div>
          <div class="mb-1 text-body-secondary">
            <span class="label">Emprestado para: </span>
            {{ game ? loan.userName : '' }}
          </div>
          <div class="mb-1 text-body-secondary">
            <span class="label">Status: </span>
            {{ game ? loan.status : '' }}
          </div>
          
          <LoanActions v-if="loan" :loan="loan" :displayLink="false" />  

        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="card-img-top" src="https://picsum.photos/600/300/?image=25">
        </div>
      </div>
    </div>

    <FeeByLoan v-if="loan" :loanId="loan.id" />
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import LoanActions from './LoanActions.vue'
import FeeByLoan from '../fee/FeeByLoan.vue'

export default {
  name: 'Loan',
  computed: mapState(['user']),
  components: {LoanActions, FeeByLoan},
  data() {
    return {
      loan: null,
      game: null
    };
  }, 
  methods: {
  },
  mounted() {
    if(this.$route.params.id) {
        const urlLoan = `${baseApiUrl}/loans/${this.$route.params.id}`   
        
        axios.get(urlLoan).then(res => {
            this.loan = res.data
            const urlGame = `${baseApiUrl}/games/${this.loan.gameId}`
            axios.get(urlGame).then(res => this.game = res.data)
        })
    }       
  }
};
</script>
<style scoped>
    span.label {
        font-weight: bold;
    }
</style>