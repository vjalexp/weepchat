<template>
  <div>
    <h2 class="text-center">Вход в чат</h2>
    
    <v-form @submit.prevent="onSubmit">
       <v-alert type="error" v-show="hasError">{{ error }} </v-alert>

       
        <v-text-field id="userInput"
                      type="text"
                      placeholder="Имя пользователя"
                      v-model="userId"
                      autocomplete="off"
                      :disabled="loading"
                      required>
        </v-text-field>
  

      <v-btn type="submit" :disabled="isValid">
        Вход
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'login-form',
  data() {
    return {
      userId: '',
    }
  },
  computed: {
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading
    },
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'hasError'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async onSubmit() {
      const result = await this.login(this.userId);
      if(result) {
        this.$router.push('chat');
      }
    }
  }
}
</script>