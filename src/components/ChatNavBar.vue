<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary darken-3" dark>
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <v-toolbar-title class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Нытинг.РФ <v-chip class="ma-2" color="primary" outlined pill>Live<v-icon right>mdi-microphone</v-icon></v-chip><v-icon>mdi-chevron-right</v-icon></span>
      <span class="text-capitalize">{{$store.state.activeRoom.name}}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <span class="mr-2"><router-link v-if="$auth.isAuthenticated" to="/profile"><v-icon>mdi-account</v-icon></router-link></span>
    <span class="mr-2">{{ user.name }}</span> 
    <span class="ml-7"><v-icon @click="onLogout">mdi-exit-to-app</v-icon></span>
    <span class="ml-2">Выход</span> 
  </v-app-bar>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapState(["drawer", "user", "reconnect"])
  },
  methods: {
    onClickBtn() {
      this.setDrawer(!this.$store.state.drawer);
    },
    ...mapActions(["logout", "login"]),
    ...mapMutations(["setReconnect", "setDrawer"]),
    onLogout() {
      this.$router.push({ path: "/" });
      this.logout();
    },
    unload() {
      if (this.user.username) {
        // User hasn't logged out
        this.setReconnect(true);
      }
    }
  },
  mounted() {
    window.addEventListener("beforeunload", this.unload);
    if (this.reconnect) {
      this.login(this.user.username);
    }
  }
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>