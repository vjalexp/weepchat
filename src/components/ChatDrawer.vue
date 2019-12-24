<template>
  <v-navigation-drawer :value="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>

    <v-list dense nav v-if="activeRoom">
      <v-subheader>Топики</v-subheader>
      <v-list-item
        v-for="room in rooms"
        :key="room.name"
        :active="activeRoom.id === room.id"
        @click="onChange(room)"
      >
        <v-list-item-icon>
          <v-icon>mdi-forum</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-capitalize">{{ room.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>Участники</v-subheader>
      <v-list-item v-for="user in users" :key="user.username">
        <v-list-item-avatar>
          <v-img :src="ava(user)" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-capitalize" v-text="user.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon v-if="user.username !== 'bot'" :color="statusColor(user.presence)">mdi-web {{ user.presence }}</v-icon>
          <v-icon v-else :color="statusColor('online')">mdi-web {{ user.presence }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomList",
  computed: {
    ...mapState(["loading", "users", "drawer", "rooms", "activeRoom"])
  },
  methods: {
    ...mapActions(["changeRoom"]),
    onChange(room) {
      this.changeRoom(room.id);
    },
    statusColor(status) {
      return status === "online" ? "green" : "grey";
    },
    ava(u) {
      return `https://eu.ui-avatars.com/api/?color=FFFFFF&name=${u.name}&background=d896ff`
    },
  }
};
</script>