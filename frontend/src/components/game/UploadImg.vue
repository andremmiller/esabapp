<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <label for="imageUpload" class="custom-file-label">Choose an image</label>
                        <input type="file" class="custom-file-input" id="imageUpload" @change="uploadFile">
                    </div>
                    <img :src="getImagePath()" class="preview-image">
                </form>
            </div>
        </div>
    </div>
  <!-- <div>
    <h1>File Upload</h1>
    <img :src="getImagePath()" />
    <input type="file" @change="uploadFile" />
  </div> -->
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
<style scoped>
    .custom-file-input {
      cursor: pointer;
    }
    .custom-file-label {
      overflow: hidden;
    }
    .preview-image {
      max-width: 100%;
      max-height: 400px;
      display: block;
      margin-top: 10px;
    }
</style>

