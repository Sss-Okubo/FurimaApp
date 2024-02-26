<template>
  <div>    
    <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <v-card-text>
        <h2 class="text-center"> ログイン</h2>
      </v-card-text>
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email" type="email" required
        >
        </v-text-field>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="password" type="password" required
        >
        </v-text-field>
        <v-btn
          block
          class="mb-8"
          color="red" dark
          size="large"
          variant="tonal" 
          @click="login"
        >
          ログイン
        </v-btn>
      </v-card>
    </div>
</template>


<script>
import firebase from '~/plugins/firebase'

export default {
  layout: 'other',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>