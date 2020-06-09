<template>
  <v-flex>
    <v-flex mt-4 mb-4>
      <app-add-ip @reloadItem="reloadItem"></app-add-ip>
    </v-flex>
    <v-card-title>
      IPs
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
      <v-data-table :headers="headers" :items="infos" :search="search" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <app-edit-ip @reloadItem="reloadItem" :item="item" ></app-edit-ip>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon v-if="item.uiport != 0" small @click="openItem(item)">
          mdi-open-in-new
        </v-icon>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'IP',
            align: 'start',
            sortable: true,
            value: 'ip',
          },
          { text: 'Hostname', value: 'hostname', sortable: false},
          { text: 'Subnet', value: 'subnet' },
          { text: 'Ports', value: 'ports', sortable: false},
          { text: 'Manufacturer', value: 'manufacturer_name'},
          { text: 'Device', value: 'type'},
          { text: 'Note', value: 'note', sortable: false},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        infos: [],
        linked: {},
      }
    },
    created() {
      this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/ips').then(function(data){
        this.infos = data.body //get request data and send it do return items
    });
  },
  methods: {
    deleteItem (item) {
      this.$http.delete('http://'+process.env.VUE_APP_BOTURL+':3000/api/ips/'+item.id).then(function(){
        this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/ips').then(function(data){
          this.infos = data.body
        });
      });
    },
    openItem (item) {
        window.open('http://'+item.ip + ":" + item.uiport);
    },
    reloadItem () {
      setTimeout(function () {
        this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/ips').then(function(data){
        this.infos = data.body //get request data and send it do return items
      })
    }.bind(this), 500)
    }
  }
}

</script>
