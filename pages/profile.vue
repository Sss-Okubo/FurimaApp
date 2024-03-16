<template>
  <v-app>
    
      <v-container class="mb-0">
        <v-row justify="center" align-content="center">
          <h3 class="mt-5">プロフィール設定</h3>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="1"></v-col>
          <v-col cols="2">
            <v-avatar
            size="100"
            class="ma-10"
            >
              <v-img v-if="imageUrl" :src="imageUrl" contain></v-img>
              <v-img v-else src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="3" class="ma-15">
            <v-btn 
              color="red"
              large
              outlined
              @click="$refs.fileInput.click()">画像を選択する</v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              @change="handleFileUpload"
              accept="image/*"
            />
            <!-- <v-btn
              color="red"
              large
              outlined
              @click="toProfile()"
            >画像を選択する</v-btn> -->
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field
              value=""
              label="ユーザ名"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field
              value=""
              label="郵便番号"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field
              value=""
              label="住所"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-text-field
              value=""
              label="建物名"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-btn
                block
                class="mb-4"
                color="red" dark
                size="x-large"
                variant="flat"
                v-on:click="clickUpdate()"
              >
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
      newEmail: "",
      goodsLists: [],
      userInfo: [],
      isLogon: false,
      imageUrl: null,
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
      this.updateImage();
    },
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
        this.userInfo = resData1.data.data[0];
        this.getMySellList();
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      }
    },
    updateImage() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        console.log(this.selectedFile)
        // axiosなどを使ってサーバーにファイルを送信
        this.axios.post('http://127.0.0.1:8000/api/profile/upload', formData)
          .then(response => {
            console.log('File uploaded successfully:', response.data);
          // ファイルのアップロードが成功した場合の処理を追加する
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          // ファイルのアップロード中にエラーが発生した場合の処理を追加する
        });
      } else {
        console.error("No file selected.");
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