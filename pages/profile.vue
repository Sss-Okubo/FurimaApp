<template>
  <v-app>

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
          <v-text-field value="" label="ユーザ名" v-model="name" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-text-field value="" label="郵便番号" v-model="postno" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-text-field value="" label="住所" v-model="address1" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-text-field value="" label="建物名" v-model="address2" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-btn block class="mb-4" color="red" dark size="x-large" variant="flat" v-on:click="clickUpdate()">
            更新する
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
      selectedFile:null
    }
  },
  methods: {
    async getMyBuyList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods/getMyBuyList/" + this.userInfo.id
      );
      this.goodsLists = resData.data.data;
    },
    async getMySellList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods/getMySellList/" + this.userInfo.id
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
      this.updateProfile();
    },
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
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
      await this.$axios.post("http://127.0.0.1:8000/api/users/update/", sendData);
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
        this.$axios.post("http://127.0.0.1:8000/api/users/upload/", formData)
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
    }
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