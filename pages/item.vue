<template>
  <v-app>
    <v-container>
      <div class="main">
        <div class="item-image">
          <v-carousel >
            <v-carousel-item v-for="image in images" :key="image.id" >
              <v-img
                :src= image.url
                aspect-ratio="1"
              ></v-img>
            </v-carousel-item>
          </v-carousel >
        </div>
        <div class="item-detail">
          <v-sheet
          border="md"
          class="pa-6 text-white mx-auto"
          >
            <h4 class="text-h5 font-weight-bold mb-2">商品名</h4>
            <p class="mb-8">
              {{ goods.goods_name }}
            </p>
            <div class="item-price align-end">
              <p class="text-h5 font-weight-bold">{{ price }}</p>&nbsp;
              <p class="text-body-2 ">(税込)送料込み</p>
            </div>
            <div class="item-opinion  mb-4">
              <div class="item-like">
                <v-btn v-if="islike" @click="deleteLike(goods.id)" icon color="yellow" >
                  <v-icon large >mdi-star-outline</v-icon>
                </v-btn>
                <v-btn v-else @click="insertLike(goods.id)" icon color="Glay" >
                  <v-icon large >mdi-star-outline</v-icon>
                </v-btn><br>&nbsp;
                <v-text class="text-caption">{{ likes.likeCount }}</v-text>
              </div>
              <div class="item-comment ml-4">
                  <v-btn @click="deleteLike(goods.id)" icon color="glay">
                    <v-icon large >mdi-chat-outline</v-icon>
                  </v-btn><br>&nbsp;
                  <v-text class="text-caption">{{ commentCount }}</v-text>
                </div>
            </div>
            <v-btn
                block
                class="text-none text-black mb-4"
                color="error" dark
                size="x-large"
                variant="flat"
              >
                購入する
              </v-btn>
            <h4 class="text-h6 font-weight-bold mb-2">商品説明</h4>
            <p class="mb-4">
                {{ goods.detail }}
            </p>
            <h4 class="text-h6 font-weight-bold mb-4">商品の情報</h4>
              <div class="item-category text-lg-subtitle-1 font-weight-bold mb-4">カテゴリ</div>
              <div class="item-condition text-lg-subtitle-1 font-weight-bold mb-4">商品の状態</div>
          </v-sheet>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loginUserID: "2",
      islike: false,
      likeCount: 0,
      commentCount:30,
      goods: [],
      images: [],
      likes:[],
      price: "",
    };
  },
  methods: {
    // 商品取得（id)
    async getGoodsById(goodsId) {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/goods/" + goodsId
      );
      this.goods = resData.data.data[0];
      this.price = this.goods.price.toLocaleString('ja-JP',{style:'currency',currency:'JPY'});
    },

    // 画像取得
    async getImages(goodsId) {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/image/" + goodsId
      );
      this.images = resData.data.data;
    },

    // お気に入り取得
    async getLikes(goodsId, loginID) {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/likes/" + goodsId + '/' + loginID
      );
      this.likes = resData.data.data;
      this.islike = this.likes.isLike;

    },
    // liked
    async insertLike(id) {
      const sendData = {
          goods_id: id,
          user_id: this.loginUserID,
        };
        await this.$axios.post("http://127.0.0.1:8000/api/likes/", sendData);
        this.getLikes(id, this.loginUserID);
    },
    // unliked
    async deleteLike(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/likes/" + id + '/' + this.loginUserID);
      this.getLikes(id, this.loginUserID);
    },
  },
  created() {
    this.GoodsId =this.$route.query.id;
    this.getGoodsById(this.GoodsId);
    this.getImages(this.GoodsId);
    this.getLikes(this.GoodsId,this.loginUserID);
  },
};
</script>

<style>
.main {
  display: flex;
  margin-top: 1rem;
}
.item-image {
  padding: 15px;
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.item-detail {
  padding: 15px;
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.item-price{
  display: flex;
}
.item-opinion{
display: flex;
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