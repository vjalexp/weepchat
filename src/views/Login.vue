<template>
<div>
    <LoginForm />
   
    <div v-if="!$auth.loading">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
</div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>