<template>
  <v-app>
    <div class="list-select mb-0">
      <v-tabs align-with-title v-model="selectedTab">
        <v-tab href="#one" @click="clickRecommendation()" value="recommendation">
          おすすめ
        </v-tab>
        <v-tab href="#two" @click="clickMylist()" value="mylist">
          マイリスト
        </v-tab>
        <v-tabs-slider color="pink"></v-tabs-slider>
      </v-tabs>
    </div>
    <v-divider></v-divider>
    <div class="item-list">
      <div class="wrap">
        <div class="item" v-for="item in goodsLists" :key="item.id">
          <v-sheet>
            <v-img :src=item.urls[0] aspect-ratio="1" @click="clickImage(item.id)"></v-img>
            <span @click="clickImage(item.id)">
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
      newName: "",
      newEmail: "",
      goodsLists: [],
      userInfo: [],
      isLogon: false,
      selectedTab: 'recommendation'
    }
  },
  methods: {
    async getGoodsList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods_all/"
      );
      this.goodsLists = resData.data.data;
    },
    async getGoodsListMylike() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods/getMylist/" + this.userInfo.id
      );
      this.goodsLists = resData.data.data;
    },
    clickImage(itemId) {
      this.$router.push({ path: '/item', query: { itemId: itemId,userId: this.userInfo.id } });
    },
    clickRecommendation() {
      this.getGoodsList();
    },
    clickMylist() { 
      this.getGoodsListMylike();
    },
    async getUser() {
      if (this.isLogon) {
          const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
          this.userInfo = resData1.data.data[0];
      }
    }
  },
  
  created() {
    this.goodsLists = null;
    firebase.auth().onAuthStateChanged((user) => {
      this.uid = "";
      this.isLogon = false;
      if (user) {
          this.uid = user.uid;
          this.isLogon = true;
          this.getUser();
      }
      this.getGoodsList();
    })
    this.$nuxt.$on('updateGoodslist', data => {
      // リスト更新
      this.goodsLists = data;
    });
    this.$nuxt.$on('updateGoodstab', () => {
      // タブ更新
      this.selectedTab = 'recommendation';
    });
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