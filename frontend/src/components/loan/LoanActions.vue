<template>
    <div>
        <router-link 
            :to="{ name: 'loan', params: { id: loan.id } }"
            v-if="displayLink == true"
        >
            <button class="btn btn-primary">Ver</button>
        </router-link>  
        <button type="button" class="btn btn-success" 
                v-if="loan.gameUserId == user.id && loan.status == 'Solicitado'" 
                @click="changeStatus(loan, 'Vigente')">
                Aceitar
        </button>
        <button type="button" class="btn btn-danger" 
            v-if="loan.gameUserId == user.id && loan.status == 'Solicitado'" 
            @click="changeStatus(loan, 'Finalizado')">
            Recusar
        </button>
        <button type="button" class="btn btn-info" 
            v-if="loan.gameUserId == user.id && loan.status == 'Vigente'" 
            @click="changeStatus(loan, 'Finalizado')">
            Confirmar devolução
        </button>
        <button type="button" class="btn btn-warning" 
            v-if="loan.gameUserId == user.id && loan.status == 'Com pendência'" 
            @click="confirmFeePayment(loan)">
            Confirmar pagamento
        </button>      
    </div>
</template>
<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'LoanActions',
  props: ['loan', 'displayLink'],
  computed: mapState(['user']),
  methods: {
    async changeStatus(loan, newStatus) {
        loan.status = newStatus
        loan.beginAt = loan.beginAt.split('T')[0]
        loan.endAt = loan.endAt.split('T')[0]

        axios.put(`${baseApiUrl}/loans/${loan.id}`, loan)
          .then(() => {
              this.$toasted.global.defaultSuccess()
          })
          .catch(showError)
    },
    async confirmFeePayment(loan) {
      axios.put(`${baseApiUrl}/confirmPayment`, loan)
          .then(() => {
              this.$toasted.global.defaultSuccess()
          })
          .catch(showError)
    }
  }
};
</script>

<style scoped>
  .btn {
        margin-right: 4px
    }
</style>