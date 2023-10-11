<template>
  <div>
    <h1>File Upload</h1>
    <img :src="getImagePath()" />
    <input type="file" @change="uploadFile" />
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'UploadImg',
    data() {
        return {
            game: null
        };
    },
    methods: {
        uploadFile(event) {
            const file = event.target.files[0];
            if (!file) {
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            axios.post(`${baseApiUrl}/games/${this.$route.params.id}/uploadImg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                }).then((response) => {
                    this.$toasted.global.defaultSuccess()
                    this.game.image = response.data
                }).catch((error) => {
                    console.error(error);
                });
        },
        getImagePath() {
            return this.game ? `${baseApiUrl}/uploads/${this.game.image}` : ''
        }
    },
    mounted() {
        if(this.$route.params.id) {
            const url = `${baseApiUrl}/games/${this.$route.params.id}`
            axios.get(url).then(res => this.game = res.data)
        }       
    }
};
</script>

