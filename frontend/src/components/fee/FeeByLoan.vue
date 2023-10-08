<template>
  <div>
    <h5>Multas associadas</h5>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Valor (R$)</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fee in fees" :key="fee.id">
                <td>{{ fee.id}}</td>
                <td>{{ fee.value }}</td>
                <td>{{ fee.status }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name: 'FeeByLoan',
  props: ['loanId'],
  data() {
    return {
      fees: null
    };
  }, 
  methods: {
  },
  mounted() {
    const url = `${baseApiUrl}/feesByLoan/${this.loanId}`
    axios.get(url).then(res => this.fees = res.data)       
  }
};
</script>