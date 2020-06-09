<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" rounded v-on="on">
          <v-icon left light>mdi-clipboard-plus</v-icon>
          add
        </v-btn>
      </template>
      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          Add ip
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="IP" v-model="ip" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Hostname" v-model="hostname" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6">
              <v-select item-text="subnet" item-value="id" :items="subnets" v-model="subnet" label="Subnet" outlined></v-select>
            </v-col>
            <v-col sm="6">
              <v-text-field label="Ports" v-model="ports" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="3">
              <v-select item-text="manufacturer_name" item-value="id" :items="manufacturers" v-model="manufacturer" label="Manufacturer" outlined></v-select>
            </v-col>
            <v-col sm="3">
              <v-select item-text="type" item-value="id" :items="devices" v-model="device" label="device" outlined></v-select>
            </v-col>
            <v-col sm="6">
              <v-text-field label="note" v-model="note" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6">
              <v-switch v-model="ui" label="Web UI"></v-switch>
            </v-col>
            <v-col sm="6">
              <v-text-field v-if="ui" v-model="uiport" label="UI Port" single-line outlined></v-text-field>
            </v-col>
          </v-row>
        </v-flex>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="warning" text @click="dialog = false">
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="onCreate">
            add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data: () => ({
      devices: [],
      subnets: [],
      manufacturers: [],
      ui: false,
      dialog: '',
      ip: '',
      hostname: '',
      subnet: '',
      ports: '',
      manufacturer: '',
      device: '',
      note: '',
      uiport: '0',
    }),
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          ip: this.ip,
          hostname: this.hostname,
          subnet_id: this.subnet,
          ports: this.ports,
          manufacturer_id: this.manufacturer,
          device_id: this.device,
          note: this.note,
          uiport: this.uiport,
      }
      this.$emit('reloadItem')
      this.$http.post('http://'+process.env.VUE_APP_BOTURL+':3000/api/ips', body).then();
      //this.dialog = false
    }
  },
  created() {
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/manufacturers').then(function(data){
      this.manufacturers = data.body //get request data and send it do return items
    });
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/devices').then(function(data){
      this.devices = data.body //get request data and send it do return items
    });
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+':3000/api/subnets').then(function(data){
      this.subnets = data.body //get request data and send it do return items
    });
  }
}
</script>
