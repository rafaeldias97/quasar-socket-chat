<template>
  <q-page class="bg-dark">
    <div class="row">
      <div v-if="messages.length <= 0" class="flex flex-center col-6" style="height: 100px">
        <q-alert style="width: 100%" class="text-center" color="purple">Sem mensagens no momento</q-alert>
      </div>
      <div v-else class="col-12 bg-dark q-pa-md" style="height: 83vh">
        <q-scroll-area ref="chatArea" style="height: 90%;">
          <div v-for="(message, index) in messages" :key="index">
            <div v-if="!message.data">
              <q-alert style="width: 100%" class="text-center q-pb-md" color="grey-10">
                <b color="black">{{ message.user }}</b>
              </q-alert>
            </div>
            <div v-else>
              <q-chat-message
                :name="'<b>'+message.user+'</b>'"
                class="text-white"
                :avatar="message.image"
                :text="message.message"
                :stamp="verifyDateAgo(message.data)"
                :sent="message.id === id"
              />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="row gutter-sm items-center q-pa-sm text-center bg-grey-10">
      <div class="col-11">
        <q-input
          v-model="message"
          inverted-light
          placeholder="Escreva sua mensagem aqui ..."
          color="white"
          @keyup.enter="sendMessage()"
        ></q-input>
      </div>
      <div class="col-1">
        <q-btn
          round
          color="purple"
          icon="send"
          :disable="hasValueInput()"
          title="Enviar Mensagem"
          @click="sendMessage()"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import io from "socket.io-client";
import moment from "moment";
export default {
  data() {
    return {
      id: 0,
      user: "",
      image: "",
      message: "",
      url: "",
      messages: [],
      socket: io("192.168.55.122:3001"),
      scrolW: 0
    };
  },
  created() {
    this.socket = io("192.168.55.122:3001/ROOM");
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
      if (!this.hasValueInput()) {
        this.socket.emit("SEND_MESSAGE", {
          id: this.id,
          user: window.localStorage.getItem("name"),
          image: window.localStorage.getItem("image"),
          message: [this.message],
          data: Date.now()
        });
        this.message = "";
      }
    },
    scrollToBottom() {
      this.scrolW = this.$refs.chatArea.$el.scrollHeight;
      this.$refs.chatArea.setScrollPosition(
        this.$refs.chatArea.$el.scrollHeight,
        1
      );
    },
    hasValueInput() {
      return this.message === "";
    },
    verifyDateAgo(data) {
      moment.locale("pt-br");
      let res = moment(data).fromNow();
      setInterval(() => {
        return (res = moment(data).fromNow());
      }, 1000);

      return res;
    }
  },
  beforeDestroy() {
    this.socket.emit("DESTROY_ID", {
      user: window.localStorage.getItem("name") + ": Saiu"
    });
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
      user: window.localStorage.getItem("name") + ": Está conectado"
    });

    this.socket.on("MESSAGE_id", data => {
      if (this.id === 0) {
        this.id = data.id;
      }
      this.messages.push(data.data);
    });

    this.socket.on("MESSAGE_DESTROY", data => {
      this.messages.push(data.data);
    });
  }
};
</script>
