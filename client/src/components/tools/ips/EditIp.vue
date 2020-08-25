<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-icon small v-on="on">mdi-pencil</v-icon>
      </template>
      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          edit ip
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="IP" v-model="editedIp" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Hostname" v-model="editedHostname" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6">
              <v-select item-text="subnet" item-value="id" :items="subnets" v-model="editedSubnet" label="Subnet" outlined></v-select>
            </v-col>
            <v-col sm="6">
              <v-text-field label="Ports" v-model="editedPorts" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="3">
              <v-select item-text="manufacturer_name" item-value="id" :items="manufacturers" v-model="editedManufacturer" label="Manufacturer" outlined></v-select>
            </v-col>
            <v-col sm="3">
              <v-select item-text="type" item-value="id" :items="devices" v-model="editedDevice" label="device" outlined></v-select>
            </v-col>
            <v-col sm="6">
              <v-text-field label="note" v-model="editedNote" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="6">
              <v-switch v-model="ui" label="Web UI"></v-switch>
            </v-col>
            <v-col sm="6">
              <v-text-field v-if="ui" v-model="editedUiport" label="UI Port" single-line outlined></v-text-field>
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
            update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
      devices: [],
      manufacturers: [],
      subnets: [],
      ui: false,
      dialog: false,
      editedIp: this.item.ip,
      editedHostname: this.item.hostname,
      editedSubnet: this.item.subnet_id,
      editedPorts: this.item.ports,
      editedManufacturer: this.item.manufacturer_id,
      editedDevice: this.item.device_id,
      editedNote: this.item.note,
      editedUiport: this.item.uiport,
      }
    },
    methods: {   //pus the updated info to DB
      onCreate () {
      const body = {
          ip: this.editedIp,
          hostname: this.editedHostname,
          subnet_id: this.editedSubnet,
          ports: this.editedPorts,
          manufacturer_id: this.editedManufacturer,
          device_id: this.editedDevice,
          note: this.editedNote,
          uiport: this.editedUiport,
      }
      this.$emit('reloadItem')
      this.$http.put('http://'+process.env.VUE_APP_BOTURL+'/api/ips/'+ this.item.id, body).then();
      this.dialog = false
    }
  },
  created() {
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+'/api/manufacturers').then(function(data){
      this.manufacturers = data.body //get request data and send it do return items
    });
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+'/api/devices').then(function(data){
      this.devices = data.body //get request data and send it do return items
    });
    this.$http.get('http://'+process.env.VUE_APP_BOTURL+'/api/subnets').then(function(data){
      this.subnets = data.body //get request data and send it do return items
    });
  }
}
</script>
