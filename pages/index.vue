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
    <div class="item">
      <v-sheet>
        <v-img
          src="/image/image1.jpg"
          aspect-ratio="1"
        ></v-img>
          <span>
            ムルーア ベーシックワイドパンツ Mサイズ
          </span>
      </v-sheet>
    </div>
    <div class="item">
      <v-sheet >
        <v-img
          src="/image/image2.jpg"
          aspect-ratio="1"
        ></v-img>
          <span>
            【数量限定】レディース　両耳用　ピアス　ゴールド　金　　高見え　上品　おしゃれ
          </span>

      </v-sheet>
    </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image3.jpg"
            aspect-ratio="1"
          ></v-img>
            <span>
              文豪ストレイドッグス　角川文庫コラボ缶バッジ　夢野久作
            </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image4.jpg"
            aspect-ratio="1"
          ></v-img>
          <span>
              薬屋のひとりごと マルイ　ポストカード　全5種
            </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image5.jpg"
            aspect-ratio="1"
          ></v-img>
          <span>
              ホロライブ 星街すいせい Shout in Crisis ライブグッズ Tシャツ
            </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image6.jpg"
            aspect-ratio="1"
          ></v-img>
          <span>
              『日本製』fou forétフーフォレ・セットアップスーツ グレー
            </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image7.jpg"
            aspect-ratio="1"
          ></v-img>
          <span>
              Eddie Bauer エディーバウアー ナイロンジャケット ロングコート Ｌ
          </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet>
          <v-img
            src="/image/image8.jpg"
            aspect-ratio="1"
          ></v-img>
            <span>
              ノースフェイス　マウンテンライトジャケット
            </span>
        </v-sheet>
      </div>
      <div class="item">
        <v-sheet >
          <v-img
            src="/image/image9.jpg"
            aspect-ratio="1"
          ></v-img>
            <span>
              RICH NOBLE ニットジャケット【L-LL相当】カーディガン　エレガント
            </span>
        </v-sheet>
      </div>
        <div class="item">
          <v-sheet>
            <v-img
              src="/image/image10.jpg"
              aspect-ratio="1"
            ></v-img>
              <span>
                ✨ほぼ新品✨ルイヴィトン アエログラム ポルトフォイユ ブラザNM 長財布
              </span>
          </v-sheet>
        </div>
      
    </div>

    </div>
  </v-app>
</template>


<script>


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