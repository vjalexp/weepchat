<template>
  <div>
    <small class="text-muted">@{{ user.username }}</small>
    <v-form @submit.prevent="onSubmit" v-bind:class="{ running: sending }">
      <v-alert type="error" v-show="hasError">{{ error }}</v-alert>

      <v-textarea
        required
        filled
        shaped
        auto-grow
        rows="2"
        row-height="30"
        id="message-input"
        @input="isTyping"
        v-model="message"
        prepend-icon="mdi-emoticon"
        :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
        @click:append-outer="onSubmit"
        @click:prepend="loadSmiles()"
      ></v-textarea>

    </v-form>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import { mapActions, mapState, mapGetters } from "vuex";
import { isTyping } from "../chatkit.js";

export default {
  name: "message-form",
  beforeMount() {
    const pusher = new Pusher('4299975ec852b4e16e47', {
      cluster: 'eu',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      this.sendMessage(data.message);
    });
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["user", "sending", "error", "activeRoom"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions(["sendMessage"]),
    async onSubmit() {
      const result = await this.sendMessage(this.message);
      if (result) {
        /*bot start*/
        fetch('https://weepbot.herokuapp.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: this.message
          }),
        });
        /*bot end*/
        this.message = "";
      }
    },
    async isTyping() {
      await isTyping(this.activeRoom.id);
    },
    loadSmiles() {
      //TODO
    },
  }
};
</script>