<template>
  <v-app id="app">
    <v-container>
      <v-toolbar density="compact">
        <v-app-bar-nav-icon @click="toIndex"></v-app-bar-nav-icon>
        <v-toolbar-title >COACHTECH</v-toolbar-title>
        <v-spacer />
        <v-text-field
          label="なにをお探しですか？"
          sigle-line
          hide-details
          append-icon="mdi-magnify"
        />
        <div v-if="isLogon">
          <v-btn class="ml-5" text @click="logout">
            ログアウト
          </v-btn>             
        </div>
        <div v-else >
          <v-btn class="ml-5" text  @click="toLogin">
            ログイン
          </v-btn>       
        </div>
        <div v-if="isLogon">
          <v-btn class="ml-5" text @click="toMypage">
            マイページ
          </v-btn>
        </div>
        <div v-else>
          <v-btn class="ml-5" text @click="toRegister">
            会員登録
          </v-btn>
        </div>
        <v-btn  class="ml-5" @click="toSell">
            出品
        </v-btn>              
      </v-toolbar>
      <div>
        <nuxt />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  methods: {
    toRegister() {
      this.$router.replace('/register')
    },

    toLogin() {
      this.$router.replace('/login')
    },
    toMypage() {
      this.$router.replace('/mypage')
    },
    toIndex() {
      this.$router.push('/', () => {})
    },
    toSell() {
      this.$router.push('/sell', () => {})
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          this.$router.replace('/')
          this.isLogon = false
        })
    },
  },
  data() {
    return {
      isLogon: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogon = true
      }
    })
  },
}
</script>
<style>
</style>