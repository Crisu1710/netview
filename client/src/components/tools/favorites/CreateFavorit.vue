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
          Add to favorites
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="6">
              <v-combobox v-model="name" label="name" outlined :items="names" deletable-chips></v-combobox>
            </v-col>
            <v-col sm="6">
              <v-text-field label="ICON URL" v-model="icon_url" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-select :items="protocols" label="protocol" v-model="https" outlined></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field label="IP or Hostname" v-model="hostname" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field label="Port" v-model="port" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="path" v-model="path" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="8">
              <v-text-field label="note" v-model="note" single-line outlined></v-text-field>
            </v-col>
            <!-- color -->
            <v-col class="shrink" sm="4">
              <v-text-field v-model="color" hide-details class="ma-0 pa-0" outlined>
                <template v-slot:append>
                    <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                      <template v-slot:activator="{ on }">
                        <div :style="swatchStyle" v-on="on" />
                      </template>
                      <v-card>
                        <v-card-text class="pa-0">
                          <v-color-picker v-model="color" flat />
                        </v-card-text>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
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
      protocols: ['http', 'https'],
      names: ['PiHole', 'HomeAssistannt', 'XCP-ng', 'Nextclou', 'Phoscon-GW', 'Grafana', 'FritzBox', 'Prometheus', 'UniFi', 'OPNsense', 'Træfik', 'Cadvisor', 'OpenMediaVault'],
      color: '#283593',
      menu: false,
      dialog: false,
      name: '',
      icon_url: '',
      https: 'https',
      hostname: '',
      port: '443',
      path: '',
      note: '',
    }),
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          name: this.name,
          icon_url: this.icon_url,
          https: this.https,
          hostname: this.hostname,
          port: this.port,
          path: this.path,
          note: this.note,
          color: this.color,
      }
      this.$emit('reloadfavorites')
      this.$http.post('http://192.168.213.15:3000/api/favorites', body).then();
      this.dialog = false
    }
  },
  computed: {
  swatchStyle() {
    const { color, menu } = this
    return {
      backgroundColor: color,
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      borderRadius: menu ? '50%' : '4px',
      transition: 'border-radius 200ms ease-in-out'
      }
    }
  }
}
</script>
