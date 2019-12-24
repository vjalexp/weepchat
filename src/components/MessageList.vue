<template>
  <div class="message-list">
    <div id="chat-messages" class="message-group" v-chat-scroll="{smooth: true}">
      <div class="mt-2 mb-2" v-for="(message, index) in messages" :key="index" :style="message.username == 'bot' ? 'margin-left: 100px' : 'margin-left: 0px'" >

        <v-chip
          close-icon="mdi-close"
          :close="true"
          :filter="true"
          :label="false"
          :x-large="true"
          :outlined="true"
          :pill="true"
          :input-value="message.text"
        >
          <div class="d-flex flex-column mb-6">
            <div class="text-truncate">{{ message.name }}</div>
            <div class="text-truncate"><small>@{{ message.username }}</small></div>
            <div class="text-truncate">{{ message.text }}</div>
            <div class="text-truncate"><small>{{ message.date }}</small></div>
          </div>
        </v-chip>
        
      </div>
    </div>
    <div class="user-typing">
      <small class="text-muted" v-if="userTyping">@{{ userTyping }} is typing....</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'message-list',
  computed: {
    ...mapState([
      'messages',
      'userTyping'
    ])
  }
}
</script>

<style>
.message-list {
  margin-bottom: 5px;
  padding-right: 5px;
}
.message-group {
  height: 65vh !important;
  overflow-y: scroll;
}
.message-title {
  font-size: 1rem;
  display:inline;
}
.user-typing {
  height: 1rem;
}
</style>