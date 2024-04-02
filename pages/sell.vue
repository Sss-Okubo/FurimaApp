<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
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
              label="選択してください" multiple chips :rules="categoriesRules"></v-combobox>
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
              label="選択してください" chips :rules="conditionsRules"></v-combobox>
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
            <v-text-field value="" label="入力してください" v-model="goodsName" outlined :rules="goodsNameRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <h5>商品の説明</h5>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-textarea solo name="" label="入力してください" v-model="goodsDetail" :rules="goodsDetailRules"></v-textarea>
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
            <v-text-field value="" label="￥" v-model="price" outlined :rules="priceRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center" class="mt-0">
          <v-col cols="6">
            <v-btn block class="mb-4" color="red" dark size="x-large" variant="flat" v-on:click="clickSell()"
              :disabled="!valid">
              出品する
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="300">
          <v-card class="align-center justify-center">
            <v-card-title class=" grey lighten-2 ">
              Message
            </v-card-title>
            <v-card-text>
              <div class="mt-8">登録しました。</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-form>
  </v-app>
</template>
<script>
import firebase from '~/plugins/firebase'
export default {
  // middleware: 'authenticated',
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
      goodsNameRules: [
        v => !!v || '商品名が入力されていません。',
      ],
      goodsDetailRules: [
        v => !!v || '商品の説明が入力されていません。',
      ],
      priceRules: [
        v => !!v || '販売価格が入力されていません。',
        v => !isNaN(parseFloat(v)) && isFinite(v) || '値段は数値で入力してください。'
      ],
      categoriesRules: [
        v => !!v || 'カテゴリが選択されていません。',
        v => v && v.length > 0 || 'カテゴリが選択されていません。',
      ],
      conditionsRules: [
        v => !!v || '状態が選択されていません。',
      ],
      valid: false,
      dialog: false
    }
  },
  watch: {
    dialog(newValue) {
      // ダイアログが閉じられた場合にのみリダイレクトを行う
      if (!newValue) {
        this.$router.push('/mypage', () => { })
      }
    }
  },
  methods: {
    clickSell() {
      if (this.validate()) {
        this.updateGoods();
      }
    },
    toProfile() { 
      this.$router.push('/profile', () => {})
    },
    async getUser() {
      if (this.isLogon) {
        const resData1 = await this.$axios.get("http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/users/" + this.uid );
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
      this.$axios.post("http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/goods/", sendData)
        .then(response => {
          // カテゴリ登録
          this.selectedCategoriesItem.forEach(
            category => {
              const sendCategoryData = {
                goods_id: response.data.id,
                category: category.code
              }
              this.$axios.post("http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/categories/", sendCategoryData)
                .then(response => {
                  console.log("success  insertCategories");
                })
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
          this.$axios.post("http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/images/", sendImageData)
            .then(response => {
              console.log("success  insertImage")
              // ダイアログ表示
              this.dialog = true;
            })
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
        this.$axios.post("http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/users/upload/", formData)
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
        "http://ec2-52-198-95-158.ap-northeast-1.compute.amazonaws.com/api/codes/" + type 
      );
      if (type == 1) {
        this.categories = resData.data.data;
      };
      if (type == 2) {
        this.conditions = resData.data.data;
      };
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    hideAlert() {
      // テキストフィールドがフォーカスを受け取ったときにアラートを非表示にする
      this.showAlert = false;
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
  },
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