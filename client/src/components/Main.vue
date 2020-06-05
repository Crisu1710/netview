<template>
  <v-flex>
    <v-flex mt-4 mb-4>
      <v-row>
        <v-spacer></v-spacer>
        <app-add-favorit @reloadfavorites="reloadFavorites"></app-add-favorit>
        <v-spacer></v-spacer>
        <v-switch v-model="edit" label="Edit mode"></v-switch>
        <v-spacer></v-spacer>
      </v-row>
    </v-flex>

      <!-- <v-divider></v-divider> -->
    <v-layout row wrap ml-3 mr-3 mt-5>
      <v-flex xs12 sm5 md3 md v-for="favorit in favorits" :key="favorit.id">
        <v-card :color="favorit.color" class="mt-3 mx-2" target="blank" :href="favorit.https+'://'+favorit.hostname+':'+favorit.port">
            <v-list-item>
              <!-- Icon -->
              <v-list-item-avatar size="90" color="grey darken-4">
                <img :src="favorit.icon_url" >
              </v-list-item-avatar>
              <!-- Text -->
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ favorit.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <b>HOST: {{favorit.hostname}}</b><br>
                  <b>PORT: {{favorit.port}}</b><br>
                  <b v-if="favorit.note">note: {{favorit.note}}</b>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-card>
          <v-col v-if="edit" cols="auto" class="text-center pl-0">
            <v-row>
              <v-spacer></v-spacer>
              <app-edit-favorit @reloadfavorites="reloadFavorites" :favorit="favorit"></app-edit-favorit>
            </v-row>
          </v-col>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        linked: {},
        favorits: [],
        edit: false
      }
    },
    created() {
      this.$http.get("http://192.168.213.15:3000/api/favorites").then(function(data){
        this.favorits = data.body //get request data and send it do return items
    });
  },
  methods: {
    reloadFavorites () {
      setTimeout(function () {
        this.$http.get("http://192.168.213.15:3000/api/favorites").then(function(data){
        this.favorits = data.body //get request data and send it do return items
        })
      }.bind(this), 500)
    },
  }
}

</script>
