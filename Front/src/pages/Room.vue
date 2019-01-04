<template>
  <q-page>
    <div class="row">
      <div class="col-6">
        <Chat></Chat>
      </div>
      <div class="col-6">
        <Player></Player>
      </div>
    </div>
  </q-page>
</template>
<script>
import Chat from "../components/Chat.vue";
import Player from "../components/Player.vue";
export default {
  components: {
    Chat,
    Player
  },
  data() {
    return {};
  }
};
</script>