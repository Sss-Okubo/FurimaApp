<template>
  <v-app>
    <v-container>
      <div class="main">
        <div class="item-image">
          <v-carousel>
            <v-carousel-item src="/image/image1.jpg" cover></v-carousel-item>
            <v-carousel-item src="/image/image2.jpg" cover></v-carousel-item>
            <v-carousel-item src="/image/image3.jpg" cover></v-carousel-item>
          </v-carousel> 
        </div>
        <div class="item-detail">
          <v-sheet
          border="md"
          class="pa-6 text-white mx-auto"
          >
            <h4 class="text-h5 font-weight-bold mb-4">Your Privacy</h4>
            <p class="mb-8">
              This business determines the use of personal data collectied on our media
              properties and across the internet. We may collect data that you submit to
              us directly or data that we collect automatically including from cookies
              (such as device information or IP address).
              <br />
              <br />
              Please read our
              our privacy practices or click "Your Preferences" to exercise control over
              your data.
            </p>
            <v-btn
              block
              class="text-none text-black mb-4"
              color="red-accent-2"
              size="x-large"
              variant="flat"
            >
              Accept
            </v-btn>
            <v-btn
              block
              class="text-none text-black"
              color="red-accent-2"
              size="x-large"
              variant="outlined"
            >
              Your Preferences
            </v-btn>
          </v-sheet>
        </div>
      </div>
    </v-container>
  </v-app>
</template>



<script>
// import { createVuetify } from 'vuetify'

// export const vuetify = createVuetify({
//   theme: {
//     defaultTheme: 'light',
//     //
//   },
// })

// export default {
//   props: {
//     image: String,
//   },
//   data() {
//     return {
//       newName: "",
//       newEmail: "",
//       goodsLists: [],

//     }
//   },
//   methods: {
//     async getGoodsList() {
//       const resData = await this.$axios.get(
//         "http://127.0.0.1:8000/api/goods_all/"
//       );
//       this.goodsLists = resData.data.data;
//     },
//     clickImage(itemId) {
//       this.$router.push({ path: '/item', query: { id: itemId } });
//     }
//   },

//   created() {
//     this.getGoodsList();
//   },

// };

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



@media not all and (min-width: 768px) {
  .item {
    width: 100%;
  }

  .item:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>