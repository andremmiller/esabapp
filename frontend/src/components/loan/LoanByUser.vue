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
                <td>{{ loan.beginAt | displayDate }}</td>
                <td>{{ loan.endAt | displayDate }}</td>
                <td>{{ loan.status }}</td>
                <td>
                    <LoanActions :loan="loan" :displayLink="true"/>
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
import LoanActions from './LoanActions.vue'
import moment from 'moment'

export default {
  name: 'LoanList',
  components: {LoanActions},
  computed: mapState(['user']),
  data() {
    return {
      loans: null
    };
  }, 
  methods: {
  },
  mounted() {
    const url = `${baseApiUrl}/loans/loanedByUser`
    axios.get(url).then(res => this.loans = res.data)       
  }
};
</script>