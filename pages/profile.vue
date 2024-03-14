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
              <v-img src="https://cdn.vuetifyjs.com/images/lists/3.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="3" class="ma-15">
            <v-btn
              color="red"
              large
              outlined
              @click="toProfile()"
            >画像を選択する</v-btn>
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
                v-on:click="insertComment(goods.id)"
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
      isLogon :false
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
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
        this.userInfo = resData1.data.data[0];
        this.getMySellList();
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