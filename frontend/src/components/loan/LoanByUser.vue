<template>
  <div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Jogo</th>
                <th scope="col">Usuário</th>
                <th scope="col">Data início</th>
                <th scope="col">Data fim</th>
                <th scope="col">Status</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="loan in loans" :key="loan.id">
                <td>{{ loan.gameName }}</td>
                <td>{{ loan.userName }}</td>
                <td>{{ loan.beginAt }}</td>
                <td>{{ loan.endAt }}</td>
                <td>{{ loan.status }}</td>
                <td>
                    <button type="button" class="btn btn-success" v-if="loan.status == 'Solicitado'" @click="changeStatus(loan, 'Vigente')">Aceitar</button> <!-- Mudar para Vigente -->
                    <button type="button" class="btn btn-danger" v-if="loan.status == 'Solicitado'" @click="changeStatus(loan, 'Finalizado')">Recusar</button> <!-- Mudar para Finalizado -->
                    <button type="button" class="btn btn-info" v-if="loan.status == 'Vigente'" @click="changeStatus(loan, 'Finalizado')">Confirmar devolução</button> <!-- Mudar para Finalizado -->
                    <button type="button" class="btn btn-warning" v-if="loan.status == 'Com pendência'" @click="confirmFeePayment(loan)">Confirmar pagamento</button> <!-- Mudar para Finalizado -->
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'LoanList',
  computed: mapState(['user']),
  data() {
    return {
      loans: null
    };
  }, 
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
  },
  mounted() {
    const url = `${baseApiUrl}/loans/loanedByUser`
    axios.get(url).then(res => this.loans = res.data)       
  }
};
</script>