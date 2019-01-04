<template>
  <q-page class="bg-image">
    <q-card color="grey-8" class="absolute-center" style="width: 100vh">
      <q-card-title>Autenticação</q-card-title>
      <q-card-separator/>
      <q-card-main class="gutter-lg q-pa-lg">
        <div class="row">
          <div class="col">
            <q-field>
              <q-input v-model="name" inverted float-label="Apelido" class="bg-dark"></q-input>
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-field>
              <q-input v-model="image" inverted float-label="Link da Imagem" class="bg-dark"></q-input>
            </q-field>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-btn label="Conectar" color="purple" class="full-width" @click="connect()"></q-btn>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      name: "",
      image: ""
    }
  },
  methods: {
    connect() {
      window.localStorage.setItem("name", this.name)
      window.localStorage.setItem("image", this.image)
      this.$router.push('Chat')
    }
  }
};
</script>

<style scoped>
  .bg-image {
    background-image: url('../statics/background.jpg');
  }
</style>