<template>
  <v-app id="app">
    <v-container>
      <v-toolbar density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>COACHTECH</v-toolbar-title>
        <v-spacer />
        <v-text-field
          label="なにをお探しですか？"
          sigle-line
          hide-details
          append-icon="mdi-magnify"
        />
        <div v-if="isLogon">
          <v-btn variant="text" color = "#FFFFFF" @click="logout">
            ログアウト
          </v-btn>             
        </div>
        <div v-else >
          <v-btn variant="text"  color = "#FFFFFF" @click="toLogin">
            ログイン
          </v-btn>       
        </div>
        <div v-if="isLogon">
          <v-btn variant="text"  color = "#FFFFFF">
            マイページ
          </v-btn>
        </div>
        <div v-else>
          <v-btn variant="text" color = "#FFFFFF" @click="toRegister">
            会員登録
          </v-btn>
        </div>
        <v-btn variant="text" >
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