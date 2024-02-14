<template>
  <v-app id="app">
    <v-container>
      <v-toolbar density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>COACHTECH</v-toolbar-title>
        <v-spacer />
        <v-text-field
          label="なにをお探しですか？"
          sigle-line
          hide-details
          append-icon="mdi-magnify"
        />
        <v-btn variant="text" depressed=true color = "#FFFFFF">
          ログイン
        </v-btn>             
        <v-btn variant="text" depressed=true color = "#FFFFFF">
          マイページ
        </v-btn>
        <v-btn variant="text" depressed=true >
            出品
        </v-btn>              
      </v-toolbar>
      <div>
        <nuxt />
      </div>
    </v-container>
  </v-app>
</template>

<script>

</script>
 