<template>
  <v-app id="app">
    <v-container>
      <div class="main">
        <div class="left">
          <div class="main">
            <div class="item-image">
              <v-img
                :src= images.url
                aspect-ratio="1"
              ></v-img>
            </div>
            <div class="item-detail ml-10 mr-10">
              <p>{{ goods.goods_name }}</p>
              <p>{{ this.price }}</p>
            </div>
          </div>
          <div class="main">
            <div class="payment-label text-body-2">
              支払方法
            </div>
            <div class="payment-method">
              <v-select
                :items="items"
                outlined
                class="text-body-2"
                dense
              ></v-select>
            </div>
            <div class="payment-change text-body-2">
              変更する
            </div>
          </div>
          <div class="main">
            <div class="delivery-label text-body-2">
              配送先
            </div>
            <div class="delivery-method text-body-2">
              {{ userInfo.address }}
            </div>
            <div class="delivery-change text-body-2">
              変更する
            </div>
          </div>
        </div>
        <div class="right">
          <v-card variant="outlined" class="mb-10">
            <div class="main">
              <div class="price-label text-body-2">
                商品代金
              </div>
              <div class="price text-body-2">
                {{ this.price }}
              </div>
            </div>
            <div class="main">
              <div class="price-label text-body-2">
                支払金額
              </div>
              <div class="price text-body-2">
                {{ this.price }}
              </div>
            </div>
            <div class="main">
              <div class="price-label text-body-2">
                支払方法
              </div>
              <div class="price text-body-2">
                クレジットカード
              </div>
            </div>
          </v-card>
          <v-btn
              block
              class="text-none text-black mb-4"
              color="error" dark
              size="x-large"
              variant="flat"
              v-on:click="clickBuy(goods.id)"
            >
              購入する
            </v-btn>
        
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Common from '@/plugins/common'
export default {
  data() {
    return {
      loginUserId: "",
      islike: false,
      goods: [],
      price: "",
      images: [],
      userInfo: [],
      items: ['クレジットカード', '代引き', '電子マネー'],
      item_status: 0,

      comments: [],
      newComment: "",
      categories:[],      
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
      this.images = resData.data.data[0];
    },
    // ユーザ情報取得 
    async getUser() {
        const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/usersByid/" + this.loginUserId );
        this.userInfo = resData1.data.data[0];
    }
  },
  created() {
    this.GoodsId = this.$route.query.itemId;
    this.loginUserId = this.$route.query.userId;
    this.getGoodsById(this.$route.query.itemId);
    this.getImages(this.GoodsId);
    this.getUser();
    this.item_status = 1;
    //this.getImages(this.GoodsId);
    // this.getLikes(this.GoodsId, this.loginUserId);
    // this.getComments(this.GoodsId, this.loginUserId);
    // this.getCategories(this.GoodsId);
  },
};
</script>

<style>
.main {
  display: flex;
  /* margin-top: 1rem; */
}
.left{
  width: 60%;
}
.right{
  width: 40%;
}
.item-image {
  /* padding: 15px; */
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.item-detail {
  /*padding: 15px;*/
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.payment-label {
  padding: 15px;
  width: 20%;
  background-color: #fff;
  outline: #fff;
}
.payment-method {
  padding: 15px;
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.payment-change {
  padding: 15px;
  width: 30%;
  background-color: #fff;
  outline: #fff;
}
.delivery-label {
  padding: 15px;
  width: 20%;
  background-color: #fff;
  outline: #fff;
}
.delivery-method {
  padding: 15px;
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.delivery-change {
  padding: 15px;
  width: 30%;
  background-color: #fff;
  outline: #fff;
}
.price-label{
  padding: 15px;
  width: 50%;
  background-color: #fff;
  outline: #fff;
}
.price{
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
.item-condition{
  display: flex;
}
.item-category{
  display: flex;
}
.text-h6 {
  color: rgb(105, 105, 105);
}
.text-lg-subtitle-1{
  color: rgb(105, 105, 105);;
}
.text-body-2{
  color: rgb(105, 105, 105);;
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