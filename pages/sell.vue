<template>
  <v-app>

    <v-container class="mb-0">
      <v-row justify="center" align-content="center">
        <h3 class="ma-5">商品の出品</h3>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>商品の画像</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <v-img v-if="imageUrl" :src="imageUrl" contain></v-img>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
      <v-row justify="center" align-content="center">
        <v-col cols="5"></v-col>
        <v-col cols="2">
          <v-btn color="red" large outlined @click="$refs.fileInput.click()">画像を選択する</v-btn>
          <input ref="fileInput" type="file" style="display: none" @change="handleFileUpload" accept="image/*" />
        </v-col>
        <v-col cols="5"></v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h4>商品の詳細</h4>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>カテゴリー</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-combobox v-model="selectedCategoriesItem" :items="categories" item-value="code" item-text="value"
            label="選択してください" multiple chips></v-combobox>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>状態</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-combobox v-model="selectedConditionItem" :items="conditions" item-value="code" item-text="value"
            label="選択してください" chips></v-combobox>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h4>商品名と説明</h4>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>商品名</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mb-0 mt-0">
        <v-col cols="6">
          <v-text-field value="" label="入力してください" v-model="goodsName" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>商品の説明</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-textarea solo name="" label="入力してください" v-model="goodsDetail"></v-textarea>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h4>販売価格</h4>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <h5>販売価格</h5>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-text-field value="" label="￥" v-model="price" type="number" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" align-content="center" class="mt-0">
        <v-col cols="6">
          <v-btn block class="mb-4" color="red" dark size="x-large" variant="flat" v-on:click="clickSell()">
            出品する
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
      goodsId:"",
      goodsName: "",
      goodsDetail: "",
      price:"",
      imageUrl: null,
      uploadUrl:null,
      selectedFile: null,
      categories: [],
      conditions: [],
      selectedCategoriesItem: null,
      selectedConditionItem: null,
    }
  },
  methods: {
    clickSell() {
      this.updateGoods();
    },
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://127.0.0.1:8000/api/users/" + this.uid );
        this.userInfo = resData1.data.data[0];
        this.userId = this.userInfo.id;
      }
    },
    async storeGoodsInfo() {
      // 商品登録
        const sendData = {
          user_id: this.userId,
          goods_name: this.goodsName,
          price: parseInt(this.price),
          condition: this.selectedConditionItem.code,
          detail: this.goodsDetail
      }
      this.$axios.post("http://127.0.0.1:8000/api/goods/", sendData)
        .then(response => {
          // カテゴリ登録
          this.selectedCategoriesItem.forEach(
            category => {
              const sendCategoryData = {
                goods_id: response.data.id,
                category: category.code
              }
              this.$axios.post("http://127.0.0.1:8000/api/categories/", sendCategoryData)
                .then(
                  console.log("success  insertCategories")
                )
                .catch(error => {
                  console.error('Error insertCategories:', error);
                })
            }
          )
          // 画像登録
          const sendImageData = {
            goods_id: response.data.id,
            url: this.uploadUrl
          }
          console.log(sendImageData);
          this.$axios.post("http://127.0.0.1:8000/api/images/", sendImageData)
            .then(
              console.log("success  insertImage")
            )
            .catch(error => {
              console.error('Error insertImage:', error);
            })
        })
        .catch(error => {
          console.error('Error insertGoods:', error);
        })
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.imageUrl = URL.createObjectURL(this.selectedFile);
      }
    },
    updateGoods() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        console.log(this.selectedFile)
        // 商品写真を送信
        this.$axios.post("http://127.0.0.1:8000/api/users/upload/", formData)
          .then(response => {
            this.uploadUrl = response.data.url;
            console.log("イメージ選択時の処理");
            // 商品情報登録
            this.storeGoodsInfo();
            
          })
          .catch(error => {
            //console.error('Error uploading file:', error);
        });
      } else {
        console.log("イメージ未選択時の処理");
        // 商品情報登録
        this.storeGoodsInfo()
      }
    },
    // コード取得
    async getCode(type) {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/codes/" + type 
      );
      if (type == 1) {
        this.categories = resData.data.data;
      };
      if (type == 2) {
        this.conditions = resData.data.data;
      };
    },
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
    // カテゴリ表示用のデータ取得
    this.getCode(1);

    // 状態表示用のデータ取得
    this.getCode(2);
  }
}
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

h4{
  color:grey;
  margin-top: 1rem;
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