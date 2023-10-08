<template>
  <div>
    <h1>Lista de empréstimos</h1>
    <h3>Emprestados por mim</h3>
    <LoanByUser />

    <h3>Emprestados para mim</h3>
    <LoanToUser />
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import LoanByUser from './LoanByUser.vue'
import LoanToUser from './LoanToUser.vue'

export default {
  name: 'LoanList',
  components: {LoanByUser, LoanToUser},
};
</script>