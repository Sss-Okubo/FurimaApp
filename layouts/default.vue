<template>
  <v-app id="app">
    <v-container>
      <v-dialog v-model="dialog" width="300">
        <template v-slot:activator="{ on, attrs }">
        </template>
        <v-card class="align-center justify-center">
          <v-card-title class=" grey lighten-2 ">
            Message
          </v-card-title>
          <v-card-text>
            <div class="mt-8">ログアウトしました</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-toolbar density="compact">
        <v-app-bar-nav-icon @click="toIndex"></v-app-bar-nav-icon>
        <v-toolbar-title>COACHTECH</v-toolbar-title>
        <v-spacer />
        <v-text-field v-model="searchWord" label="なにをお探しですか？" sigle-line hide-details append-icon="mdi-magnify"
          @click:append="searchData" />
        <div v-if="isLogon">
          <v-btn class="ml-5" text @click="logout">
            ログアウト
          </v-btn>
        </div>
        <div v-else>
          <v-btn class="ml-5" text @click="toLogin">
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
        <v-btn class="ml-5" @click="toSell">
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
  data() {
    return {
      isLogon: false,
      dialog: false,
      searchWord: "",
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register', () => { })
    },

    toLogin() {
      this.$router.push('/login', () => { })
    },
    toMypage() {
      this.$router.push('/mypage', () => { })
    },
    toIndex() {
      this.$router.push('/', () => { })
      this.getGoodsList();
    },
    toSell() {
      this.$router.push('/sell', () => {})
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.dialog = true;
          this.$router.push('/', () => { })
          this.isLogon = false
        })
    },
    async searchData() {
      if (this.searchWord.trim() !== ""){
        // 検索の処理を実行
        const resData = await this.$axios.get(
          "http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/goods/getSearchList/" + this.searchWord
        );
        let Lists = resData.data.data;
        await this.$nuxt.$emit('updateGoodslist', Lists);
        await this.$nuxt.$emit('updateGoodstab');
      }
      this.searchWord = "";
    },
    async getGoodsList() {
      const resData = await this.$axios.get(
        "http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/goods_all/"
      );
      this.goodsLists = resData.data.data;
      let Lists = resData.data.data;
      await this.$nuxt.$emit('updateGoodslist', Lists);
      await this.$nuxt.$emit('updateGoodstab');
    },  
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogon = true
      }
    })
    this.searchWord = "";
  },
}
</script>
<style></style>