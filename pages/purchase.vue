<template v-slot:activator="{ on, attrs }">
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
                v-model="selectedPlan"
                item-text="label"
                item-value="value"
                :items="items"
                outlined
                class="text-body-2"
                return-object
                dense
              />
            </div>
            <div class="payment-change text-body-2">
            </div>
          </div>
          <div class="main">
            <v-card-text class="delivery-label text-body-2" >
              配送先
            </v-card-text>
            <v-text-field
              v-model="postno"
              label="郵便番号"
              readonly
              class="text-body-2"
            ></v-text-field>
            <v-card-text  class="delivery-change text-body-2">
              <!-- 配送先住所変更ダイアログ START-->
              <v-dialog
                v-model="dialog"
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    text
                  >
                    変更する
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">住所の変更</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-text-field
                          v-model="newPostno"
                          label="郵便番号"
                          class="text-body-2"
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="newAddress1"
                          label="住所"
                          class="text-body-2"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-model="newAddress2"
                          label="建物名"
                          class="text-body-2"
                        ></v-text-field>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      v-on:click="clickUpdate()"
                    >
                      更新する
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 配送先住所変更ダイアログ END-->
            </v-card-text >
          </div>
          <div class="main">
            <v-card-text  class="delivery-label text-body-2">
            </v-card-text >
            <v-text-field
              v-model="address"
              label="住所"
              readonly
              class="text-body-2"
            ></v-text-field>
            <v-card-text  class="delivery-change text-body-2">
            </v-card-text >
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
              <div class="price text-body-2" >
                {{selectedPlan.value}}
              </div>
            </div>
          </v-card>
          <v-btn
              block
              class="text-none text-black mb-4"
              color="error" dark
              size="x-large"
              variant="flat"
              v-on:click="clickBuy()"
            >
              購入する
            </v-btn>
        
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  middleware: 'authenticated',
  data() {
    return {
      GoodsId:"",
      loginUserId: "",
      islike: false,
      goods: [],
      price: "",
      images: [],
      userInfo: [],
      selectedPlan: { label: 'クレジットカード'   , value: 'クレジットカード'  },
      items: [
        { label: 'クレジットカード'   , value: 'クレジットカード'  },
        { label: '代引き' , value: '代引き'    },
        { label: '電子マネー' , value: '電子マネー'   },
      ],
      postno: "変更から入力してください",
      address: "変更から入力してください",
      dialog: false,
      newAddress1: "",
      newAddress2: "",      
      newPostno:"",
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
      this.postno = "";
      var $address1 = "";
      var $address2 = "";
      if (this.userInfo.address1 != null) {
        $address1 = this.userInfo.address1
      };
      if (this.userInfo.address2 != null) {
        $address2  = this.userInfo.address2
      };
      this.address = $address1 +  $address2 ;
    },
    // 購入データ登録
    async insertPurchase() { 
      const sendData = {
        user_id : this.loginUserId,
        goods_id : this.GoodsId,
        payment_method :this.selectedPlan.label,
        postno :this.postno,
        address1 :this.address,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/purchase/", sendData);
      this.$router.push('/', () => {})
    },
    // 購入
    clickBuy() { 
      this.insertPurchase();
    },
    // 配送先更新
    clickUpdate() {
      this.postno = this.newPostno;
      this.address = this.newAddress1 + this.newAddress2;
      this.dialog = false;
    },
    // 郵便番号から住所取得
    async searchAddress() {
      // フォームで入力された郵便番号を入れたAPIを呼び出す
      this.$axios.$get(`/zipApi/api/search?zipcode=${this.newPostno}`).then((res) => {
        // 該当住所が存在しない場合はnullになる
        if (res.results == null) return
        // 該当住所があればaddressに代入する
        this.newAddress1 = res.results[0]['address1'] + res.results[0]['address2'] + res.results[0]['address3'];
      })
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.replace('/login')
        const currentPath = this.$route.path
        this.$router.push({ path: '/login', query: { redirect: currentPath } });
      }
    })
    this.GoodsId = this.$route.query.itemId;
    this.loginUserId = this.$route.query.userId;
    this.getGoodsById(this.$route.query.itemId);
    this.getImages(this.GoodsId);
    this.getUser();
    },
  watch: {
    newPostno(val) {
      this.searchAddress();
    }
  }
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