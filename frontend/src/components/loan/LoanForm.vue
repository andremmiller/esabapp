<template>
  <div>
    <b-form @submit.prevent="submitForm">
        <div class="form-group">
            <label>Data de início: </label>
            <input type="date" class="form-control" v-model="loan.beginAt">
        </div>
        <div class="form-group">
            <label>Data de termínio: </label>
            <input type="date" class="form-control" v-model="loan.endAt">
        </div>
        <b-button type="submit" variant="primary">Solicitar</b-button>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'LoanForm',
  props: ['game'],
  computed: mapState(['user']),
  data() {
    return {
      loan: {
        beginAt: null,
        endAt: null
      },
    };
  }, 
  methods: {
    async submitForm() {
        this.loan.userId = this.user.id
        this.loan.gameId = this.game.id
        
        axios.post(`${baseApiUrl}/loans`, this.loan)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.loan = {}
            })
            .catch(showError)
    }
  },
};
</script>