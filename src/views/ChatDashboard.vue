<template>
  <div>
    <ChatDrawer />
    <ChatNavBar />
    
    <MessageList />
    <MessageForm />
  </div>  
</template>

<script>
import ChatNavBar from '@/components/ChatNavBar.vue'
import ChatDrawer from '@/components/ChatDrawer.vue'
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";
import { mapState } from "vuex";

export default {
  name: "Chat",
  components: {
    ChatNavBar,
    ChatDrawer,
    MessageList,
    MessageForm
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>