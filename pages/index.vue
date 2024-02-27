<template>
  <v-app>
    <div class="list-select">
      <div class="recommendation-btn" >
        <v-btn variant="text" depressed="true" color = "#FFFFFF">
          おすすめ
        </v-btn>
      </div>
      <div class="mylist-btn" >
        <v-btn variant="text" depressed="true" color = "#FFFFFF">
          マイリスト
        </v-btn>
      </div>
      <p> User： {{ this.userInfo.id }}</p>
    </div>
    <v-divider thickness="5"></v-divider>
    <div class="item-list">
      <div class="wrap">
        <div class="item" v-for="item in goodsLists" :key="item.id">
          <v-sheet>
            <v-img
              :src= item.urls[0]
              aspect-ratio="1"
              @click="clickImage(item.id)"
            ></v-img>
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
      isLogon :false
    }
  },
  methods: {
    async getGoodsList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods_all/"
      );
      this.goodsLists = resData.data.data;
    },

    clickImage(itemId) {
      this.$router.push({ path: '/item', query: { itemId: itemId,userId: this.userInfo.id } });
    },

    async getUser() {
      if (this.isLogon) {
          const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
          this.userInfo = resData1.data.data[0];
      }
    }
  },
  
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user) {
          this.uid = user.uid;
          this.isLogon = true;
          this.getUser();
        }
      }
      this.getGoodsList();
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
  justify-content: space-between;
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

@media not all and (min-width: 768px) {
  .item {
    width: 100%;
  }

  .item:not(:last-child) {
    margin-bottom: 30px;
  }
}

</style>