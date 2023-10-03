<template>
  <div>
    <b-form @submit.prevent="submitForm">
      <b-form-group  label="Name:">
        <b-form-input  v-model="game.name" type="text" placeholder="Enter name" required />
      </b-form-group>

      <b-form-group  label="Description:">
        <b-form-input  v-model="game.desc" type="text" placeholder="Enter description" required />
      </b-form-group>

      <!-- <b-form-group label="Image:">
        <input type="file" id="image" @change="handleImageChange" />
      </b-form-group> -->

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'GameForm',
  computed: mapState(['user']),
  data() {
    return {
      game: {
        name: '',
        desc: ''
        //image: null,
      },
    };
  }, 
  methods: {
    async submitForm() {
      this.game.userId = this.user.id

      if(this.$route.params.id) {
        axios.put(`${baseApiUrl}/games/${this.$route.params.id}`, this.game)
          .then(() => {
              this.$toasted.global.defaultSuccess()
              this.game = {}
          })
          .catch(showError)
      } else {
        axios.post(`${baseApiUrl}/games`, this.game)
          .then(() => {
              this.$toasted.global.defaultSuccess()
              this.game = {}
          })
          .catch(showError)
      }
    },
    // handleImageChange(event) {
    //   this.formData.image = event.target.files[0];
    // },
  },
  mounted() {
    if(this.$route.params.id) {
      const url = `${baseApiUrl}/games/${this.$route.params.id}`
      axios.get(url).then(res => this.game = res.data)
    }       
  }
};
</script>