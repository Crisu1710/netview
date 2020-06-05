<template>
  <v-layout row wrap ml-4 mr-4 mt-5>
    <v-row>
      <v-col v-for="item in items" :key="item.name">
        <v-flex xs12 sm5 md12>
        <v-card >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-col cols="auto" class="text-center pl-0">
              <v-row v-if="item.name == 'manufacturers'" class="flex-column ma-0 fill-height" justify="center">
                <app-add-manufacturer @reloadmanufacturers="reloadManufacturers" ></app-add-manufacturer>
              </v-row>
              <v-row v-if="item.name == 'device'" class="flex-column ma-0 fill-height" justify="center">
                <app-add-device @reloaddevices="reloadDevices" ></app-add-device>
              </v-row>
              <v-row v-if="item.name == 'subnet'" class="flex-column ma-0 fill-height" justify="center">
                <app-add-subnet @reloadsubnets="reloadSubnets" ></app-add-subnet>
              </v-row>
            </v-col>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense v-if="item.name == 'manufacturers'">
            <v-list-item v-for="manufacturer in manufacturers" :key="manufacturer.id">
              <v-list-item-content >{{ manufacturer.manufacturer_name }}</v-list-item-content>
              <v-list-item-content >{{ manufacturer.note }}</v-list-item-content>
              <app-edit-manufacturer @reloadmanufacturers="reloadManufacturers" :manufacturer="manufacturer"></app-edit-manufacturer>
            </v-list-item>
          </v-list>
          <v-list dense v-if="item.name == 'device'">
            <v-list-item v-for="device in devices" :key="device.id">
              <v-list-item-content >{{ device.type }}</v-list-item-content>
              <v-list-item-content >{{ device.amount }}</v-list-item-content>
              <v-list-item-content >{{ device.note }}</v-list-item-content>
              <app-edit-device @reloaddevices="reloadDevices" :device="device"></app-edit-device>
            </v-list-item>
          </v-list>
          <v-list dense v-if="item.name == 'subnet'">
            <v-list-item v-for="subnet in subnets" :key="subnet.id">
              <v-list-item-content >{{ subnet.subnet_name }}</v-list-item-content>
              <v-list-item-content >{{ subnet.subnet }}</v-list-item-content>
              <v-list-item-content >{{ subnet.note }}</v-list-item-content>
              <app-edit-subnet @reloadsubnets="reloadSubnets" :subnet="subnet"></app-edit-subnet>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      </v-col>
    </v-row>
  </v-layout>
</template>


<script>
  export default {
    data: () => ({
      items: [
        {name: 'manufacturers'},
        {name: 'device'},
        {name: 'subnet'},
      ],
      manufacturers: [],
      devices: [],
      subnets: [],
    }),
    created() {
      this.$http.get("http://localhost:3000/api/manufacturers").then(function(data){
        this.manufacturers = data.body //get request data and send it do return items
      });
      this.$http.get("http://localhost:3000/api/devices").then(function(data){
        this.devices = data.body //get request data and send it do return items
      });
      this.$http.get("http://localhost:3000/api/subnets").then(function(data){
        this.subnets = data.body //get request data and send it do return items
      });
  },
  methods: {
    reloadManufacturers () {
      setTimeout(function () {
        this.$http.get("http://localhost:3000/api/manufacturers").then(function(data){
        this.manufacturers = data.body //get request data and send it do return items
      })
      }.bind(this), 500)
    },
    reloadDevices () {
      setTimeout(function () {
        this.$http.get("http://localhost:3000/api/devices").then(function(data){
        this.devices = data.body //get request data and send it do return items
      })
    }.bind(this), 500)
    },
    reloadSubnets () {
      setTimeout(function () {
        this.$http.get("http://localhost:3000/api/subnets").then(function(data){
        this.subnets = data.body //get request data and send it do return items
      })
      }.bind(this), 500)
    }
  }
}
</script>
