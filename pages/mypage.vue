<template>
  <v-app>

    <v-container class="mb-0">
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="2">
          <v-avatar size="100" class="ma-10" color="red">
            <v-img v-if="imageUrl" :src="imageUrl" contain></v-img>
            <v-icon v-else dark size="80">
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="2" class="ma-15">
          {{this.userInfo.name}}
        </v-col>
        <v-col cols="3" class="ma-15">
          <v-btn color="red" large outlined @click="toProfile()">プロフィールを編集</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="list-select mb-0">
      <v-tabs align-with-title>
        <v-tab href="#one" @click="clickMySellList()">
          出品一覧
        </v-tab>
        <v-tab href="#two" @click="clickMyBuyList()">
          購入一覧
        </v-tab>
        <v-tabs-slider color="pink"></v-tabs-slider>
      </v-tabs>
    </div>
    <v-divider></v-divider>
    <div class="item-list">
      <div class="wrap">
        <div class="item" v-for="item in goodsLists" :key="item.id">
          <v-sheet>
            <v-img :src=item.urls[0] aspect-ratio="1"></v-img>
            <span>
              {{ item.goods_name }}
            </span>
          </v-sheet>
        </div>
      </div>
    </div>
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
      imageUrl:null,
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
        this.imageUrl = this.userInfo.url;
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