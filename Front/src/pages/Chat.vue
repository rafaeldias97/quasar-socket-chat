<template>
  <q-page>
    <div class="row bg-black">
      <div v-if="messages.length <= 0" class="flex flex-center col-6 bg-dark" style="height: 90vh">
        <q-alert style="width: 100%" class="text-center" color="purple">Sem mensagens no momento</q-alert>
      </div>
      <div v-else class="col-6 bg-dark q-pa-lg" style="height: 90vh">
        <q-scroll-area ref="chatArea" style="height: 90%;">
          <div v-for="(message, index) in messages" :key="index">
            <div v-if="!message.data">
              <q-alert style="width: 100%" class="text-center q-pb-md" color="grey-10">
                <b color="black">{{ message.user }}</b>: Está conectado
              </q-alert>
            </div>
            <div v-else>
              <q-chat-message
                :name="'<b>'+message.user+'</b>'"
                class="text-white"
                :avatar="message.image"
                :text="message.message"
                stamp="4 minutes ago"
                :sent="message.id === id"
              />
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="col-6">
        <q-video
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
          style="width: 100%; height: 380px"
        />
      </div>
    </div>
    <div class="row gutter-sm items-center fixed-bottom q-pa-sm text-center bg-grey-10">
      <div class="col-5">
        <q-input
          type="textarea"
          v-model="message"
          inverted-light
          placeholder="Escreva sua mensagem aqui ..."
          color="white"
        ></q-input>
      </div>
      <div class="col-1">
        <q-btn round color="purple" icon="send" title="Enviar Mensagem" @click="sendMessage()"></q-btn>
      </div>
      <div class="col-5">
        <q-input
          type="textarea"
          v-model="url"
          inverted-light
          placeholder="URL do video"
          color="white"
        ></q-input>
      </div>
      <div class="col-1">
        <q-btn round color="dark" icon="search" title="Pesquisar" @click="sendMessage()"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      id: 0,
      user: "",
      image: "",
      message: "",
      url: "",
      messages: [],
      socket: io("localhost:3001"),
      scrolW: 0
    };
  },
  mounted() {
    if (this.hasConection()) this.$router.push("/Change");
    else this.$router.push("/Chat");
  },
  methods: {
    hasConection() {
      var has =
        window.localStorage.getItem("name") == null &&
        window.localStorage.getItem("image") == null;
      return has;
    },
    sendMessage() {
      this.socket.emit("SEND_MESSAGE", {
        id: this.id,
        user: window.localStorage.getItem("name"),
        image: window.localStorage.getItem("image"),
        message: [this.message],
        data: Date.now()
      });
      this.message = "";
    },
    scrollToBottom() {
      this.scrolW = this.$refs.chatArea.$el.scrollHeight;
      this.$refs.chatArea.setScrollPosition(
        this.$refs.chatArea.$el.scrollHeight,
        1
      );
    }
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      let msg = this.messages[this.messages.length - 1];
      let id = msg ? msg.id : "";

      if (data.id === id) {
        this.messages[this.messages.length - 1].message.push(data.message);
      } else {
        this.messages = [...this.messages, data];
      }
      this.scrollToBottom();
    });

    this.socket.emit("GENERATE_ID", {
      user: window.localStorage.getItem("name")
    });

    this.socket.on("MESSAGE_id", data => {
      if (this.id === 0) {
        this.id = data.id;
      }
      this.messages.push(data.data);
    });
  }
};
</script>