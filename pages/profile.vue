<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="mb-0">
        <v-row justify="center" align-content="center">
          <h3 class="mt-5">プロフィール設定</h3>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="1"></v-col>
          <v-col cols="2">
            <v-avatar size="100" class="ma-10" color="red">
              <v-img v-if="imageUrl" :src="imageUrl" contain></v-img>
              <v-icon v-else dark size="80">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="3" class="ma-15">
            <v-btn color="red" large outlined @click="$refs.fileInput.click()">画像を選択する</v-btn>
            <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" accept="image/*" />
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field value="" label="ユーザ名" v-model="name" outlined :rules="nameRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field value="" label="郵便番号" v-model="postno" outlined :rules="postnoRules"
              @blur="handlePostnoBlur"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field value="" label="住所" v-model="address1" outlined :rules="address1Rules"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field value="" label="建物名" v-model="address2" outlined></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-btn block class="mb-4" color="red" dark size="x-large" variant="flat" v-on:click="clickUpdate()"
              :disabled="!valid">
              更新する
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="300">
          <v-card class="align-center justify-center">
            <v-card-title class=" grey lighten-2 ">
              Message
            </v-card-title>
            <v-card-text>
              <div class="mt-8">更新しました。</div>
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
      </v-container>
    </v-form>
  </v-app>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  props: {
    image: String,
  },
  data() {
    return {
      uid: "",
      userId: "",
      name: "",
      postno: "",
      address1: "",
      address2: "",
      goodsLists: [],
      userInfo: [],
      isLogon: false,
      imageUrl: null,
      uploadUrl:null,
      selectedFile: null,
      nameRules: [
        v => !!v || 'ユーザ名が入力されていません。',
      ],
      postnoRules: [
        v => !!v || '郵便番号が入力されていません。',
        v => /^\d{7}$/.test(v) || /^[0-9]{3}-[0-9]{4}$/.test(v) || '郵便番号の形式が正しくありません。例: 1234567 または 123-4567',
      ],
      address1Rules: [
        v => !!v || '住所が入力されていません。',
      ],
      valid: false,
      dialog: false,
    }
  },
  // watch: {
  //   postno(val) {
  //     this.searchAddress();
  //   }
  // },
  methods: {
    async getMyBuyList() {
      const resData = await this.$axios.get(
        "http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/goods/getMyBuyList/" + this.userInfo.id
      );
      this.goodsLists = resData.data.data;
    },
    async getMySellList() {
      const resData = await this.$axios.get(
        "http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/goods/getMySellList/" + this.userInfo.id
      );
      this.goodsLists = resData.data.data;
    },
    clickMyBuyList() {
      this.getMyBuyList();
    },
    clickMySellList() { 
      this.getMySellList();
    },
    clickUpdate() {
      if (this.validate()) {
        this.updateProfile();
      }
    },
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/users/" + this.uid );
        this.userInfo = resData1.data.data[0];
        this.userId = this.userInfo.id;
        this.postno = this.userInfo.postno;
        this.name = this.userInfo.name;
        this.address1 = this.userInfo.address1;
        this.address2 = this.userInfo.address2;
        this.imageUrl = this.userInfo.url;
        this.getMySellList();
      }
    },
    async updateUser() {
      const sendData = {
        id: this.userId,
        name: this.name,
        postno: this.postno,
        address1: this.address1,
        address2: this.address2,
      }
      if (this.selectedFile) {
        sendData['url']=this.uploadUrl;
      }
      console.log(sendData)
      this.$axios.post("http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/users/update/", sendData)
        .then(response => {
      // ダイアログ表示
          this.dialog = true;
        })
        .catch(error => {
          console.error('Error updateUser:', error);
        })
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      }
    },
    updateProfile() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        console.log(this.selectedFile)
        // プロフィール写真を送信
        this.$axios.post("http://ec2-35-72-4-140.ap-northeast-1.compute.amazonaws.com/api/users/upload/", formData)
          .then(response => {
            this.uploadUrl = response.data.url;
            console.log("イメージ選択時の処理");
            // プロフィールを編集
            this.updateUser()
          })
          .catch(error => {
            console.error('Error uploading file:', error);
        });
      } else {
        console.log("イメージ未選択時の処理");
        // プロフィールを編集
        this.updateUser()
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    handlePostnoBlur() {
      this.searchAddress();
    },
    // 郵便番号から住所取得
    async searchAddress() {
      // フォームで入力された郵便番号を入れたAPIを呼び出す
      this.$axios.$get(`/zipApi/api/search?zipcode=${this.postno}`).then((res) => {
        // 該当住所が存在しない場合はnullになる
        if (res.results == null) return
        // 該当住所があればaddressに代入する
        this.address1 = res.results[0]['address1'] + res.results[0]['address2'] + res.results[0]['address3'];
      })
    },
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.uid = "";
      this.isLogon = false;
      if (user) {
          this.uid = user.uid;
          this.isLogon = true;
          this.getUser();
      }
    })
  }
};
</script>

<style>
.list-select
{
  display: flex;
  margin-top: 1rem;
}
.item-list
{
  margin-top: 1rem;
}
.wrap {
  display: flex;
  flex-wrap: wrap;
}

.item {
  padding: 15px;
  width: 20%;
  background-color: #fff;
  outline: #fff;
}

span{
  font-size: 0.8rem;
}

.item:hover{
  opacity:0.6
}
/* #lateral  {
  margin-bottom: 0;
} */
@media not all and (min-width: 768px) {
  .item {
    width: 100%;
  }

  .item:not(:last-child) {
    margin-bottom: 30px;
  }
}

</style>