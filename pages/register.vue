<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-text>
        <h2 class="text-center"> 新規登録</h2>
      </v-card-text>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required @focus="hideAlert"></v-text-field>

      <v-text-field v-model="password" :rules="passwordRules" label="password" required
        @focus="hideAlert"></v-text-field>

      <v-alert v-if="showAlert" border="right" colored-border type="error" elevation="2" v-model="password"
        style="font-size: 10px;" class="mt-5">
        {{ alertMessage }}
      </v-alert>

      <v-btn block class="mt-8" color="red" dark size="large" @click="register">
        登録する
      </v-btn>
      <div class="d-flex justify-center mt-5">
        <a href="/login">ログインはこちら</a>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  layout: 'other',
  data() {
    return {
      valid: true,
      showAlert: false,
      alertMessage: null,
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: "",
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
    };
  },
  methods: {
    async createUser() {
      console.log("認証済");
      // FirebaseのAuthオブジェクトを取得
      var auth = firebase.auth();
      var user = auth.currentUser;
      const sendData = {
        uid: user.uid,
        email: user.email,
      }
      await this.$axios.post("http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/users/", sendData);
    },

    register() {
      if (!this.email || !this.password) {
        this.alertMessage = "メールアドレスまたはパスワードが入力されていません。";
        this.showAlert = true;
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((resData) => {
          // Usersテーブルにデータを作成
          this.createUser();
          // TOPページに遷移
          this.$router.push('/', () => { });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.alertMessage = "メールアドレスの形式が違います。";
              this.showAlert = true;
              break;
            case "auth/email-already-in-use":
              this.alertMessage = "このメールアドレスはすでに使われています。";
              this.showAlert = true;
              break;
            case "auth/weak-password":
              this.alertMessage = "パスワードは6文字以上で入力してください。";
              this.showAlert = true;
              break;
            default:
              this.alertMessage = "登録できませんでした。しばらくしてから再度お試しください。";
              this.showAlert = true;
              console.log(error.code)
              break;
          }
        });
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    hideAlert() {
      // テキストフィールドがフォーカスを受け取ったときにアラートを非表示にする
      this.showAlert = false;
    }
  },
};
</script>