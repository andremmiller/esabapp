<template>
  <div>
    <h1>Lista de empréstimos</h1>
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
                    <td>{{ loan.gameId }}</td>
                    <td>{{ loan.userId }}</td>
                    <td>{{ loan.beginAt }}</td>
                    <td>{{ loan.endAt }}</td>
                    <td>{{ loan.status }}</td>
                    <td>
                        <button type="button" class="btn btn-success" v-if="loan.status == 'Solicitado'">Aceitar</button> <!-- Mudar para Vigente -->
                        <button type="button" class="btn btn-danger" v-if="loan.status == 'Solicitado'">Recusar</button> <!-- Mudar para Finalizado -->
                        <button type="button" class="btn btn-info" v-if="loan.status == 'Vigente'">Confirmar devolução</button> <!-- Mudar para Finalizado -->
                        <button type="button" class="btn btn-warning" v-if="loan.status == 'Com pendência'">Confirmar pagamento</button> <!-- Mudar para Finalizado -->
                    </td>
                </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
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
    
  },
  mounted() {
    const url = `${baseApiUrl}/loans/`
    axios.get(url).then(res => this.loans = res.data)       
  }
};
</script>