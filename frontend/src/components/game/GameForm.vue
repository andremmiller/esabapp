<template>
  <div>
    <b-form @submit.prevent="submitForm">
      <b-form-group  label="Name:">
        <b-form-input  v-model="formData.name" type="text" placeholder="Enter name" required />
      </b-form-group>

      <b-form-group  label="Description:">
        <b-form-input  v-model="formData.desc" type="text" placeholder="Enter description" required />
      </b-form-group>

      <b-form-group label="Image:">
        <input type="file" id="image" @change="handleImageChange" />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      formData: {
        name: '',
        desc: '',
        image: null,
      },
    };
  },
  methods: {
    handleImageChange(event) {
      this.formData.image = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('desc', this.formData.desc);
      formData.append('image', this.formData.image);

      try {
        const response = await fetch('http://10.4.20.37:3000/games', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Jogo cadastrado com sucesso!');
          // Você pode adicionar aqui um redirecionamento ou uma mensagem de sucesso
        } else {
          console.error('Erro ao cadastrar o jogo.');
          console.log(response)
        }
      } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
      }
    },
  },
};
</script>