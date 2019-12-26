<template>
<div>
    <h2>Авторизация через инвайт</h2>
    <div v-if="!$auth.loading">
      <v-btn small color="primary" v-if="!$auth.isAuthenticated" @click="login">Получить инвайт</v-btn> 
    </div>
    <div>
      Далее введите полученный по инвайту логин в форму ниже: 
      <LoginForm />
    </div>
    <div class="ma-4" v-if="!$auth.loading">
      <v-btn small color="error" v-if="$auth.isAuthenticated" @click="logout">Выйти из профиля</v-btn>
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