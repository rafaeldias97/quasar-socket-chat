<template>
  <q-page class="bg-black">
    <div class="row">
      <div class="col-12">
        <q-video
          :src="tubeLink"
          style="width: 100%; height: 380px"
        />
      </div>
    </div>
    <div class="row items-center q-pa-sm text-center">
      <div class="col-11">
        <q-field :error="$v.linkYoutube.$error" error-message="Link é obrigatório">
          <q-input
            v-model="linkYoutube"
            inverted-light
            placeholder="Link do video ..."
            color="white"
          ></q-input>
        </q-field>
      </div>
      <div class="col-1">
        <q-btn color="purple" icon="link" title @click="searchYoutube()"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import io from "socket.io-client"
import { required } from "vuelidate/lib/validators"
export default {
  data() {
    return {
      tubeLink: '',
      linkYoutube: 'https://www.youtube.com/watch?v=4hoDwVy6IQ4',
      socket: io("192.168.55.122:3001")
    }
  },
  validations: {
    linkYoutube: {
      required
    }
  },
  mounted() {
    this.socket.on("VIDEO_LINK", data => {
      this.tubeLink = data.id
    })
  },
  methods: {
    searchYoutube() {
      this.$v.linkYoutube.$touch()
      if (this.$v.linkYoutube.$error) {
        return
      }
      this.socket.emit("SEND_LINK", {
        id: this.linkYoutube.replace('watch?v=', 'embed/')
      })
    }
  }
}
</script>