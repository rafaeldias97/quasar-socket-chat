<template>
  <q-page>
    
  </q-page>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3001')
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      })
      this.message = ''
    }
  },
  mounted() {
    this.socket.on('MESSAGE', data => {
      this.messages = [...this.messages, data]
    })
  }
}
</script>