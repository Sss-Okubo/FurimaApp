<template>
  <v-app id="app">
    <v-container>
      <v-toolbar density="compact">
        <v-app-bar-nav-icon @click="toIndex"></v-app-bar-nav-icon>
        <v-toolbar-title>COACHTECH</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div class="mt-8">
        <nuxt />
      </div>
    </v-container>
  </v-app>
</template>

<script>
//import firebase from '~/plugins/firebase'
export default {
  methods: {
  },
  data() {
    return {
      isLogon: false,
    }
  },
  methods: {
    toIndex() {
      this.$router.push('/', () => { })
    },
  },
  created() {
  },
}
</script>