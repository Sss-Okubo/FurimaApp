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
    </div>
    <v-divider thickness="5"></v-divider>
    <div class="item-list">
      <div class="wrap">
        <div class="item" v-for="item in goodsLists" :key="item.id">
          <v-sheet>
            <v-img
              :src= item.urls[0]
              aspect-ratio="1"
            ></v-img>
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
export default {
  props: {
    image: String,
  },
  data() {
    return {
      newName: "",
      newEmail: "",
      goodsLists: [],

    }
  },
  methods: {
    async getGoodsList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods_all/"
      );
      this.goodsLists = resData.data.data;
    },
    
  },
  
  created() {
    this.getGoodsList();
  },
  
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

@media not all and (min-width: 768px) {
  .item {
    width: 100%;
  }

  .item:not(:last-child) {
    margin-bottom: 30px;
  }
}

</style>