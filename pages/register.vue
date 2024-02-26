<template>
  <div>    
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
    <v-card-text>
      <h2 class="text-center"> 新規登録</h2>
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
      @click="register"
    >
      登録する
    </v-btn>
    </v-card>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  layout: 'other',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace("/index");
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  },
};
</script>