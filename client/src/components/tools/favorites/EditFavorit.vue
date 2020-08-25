<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="warning">edit</v-icon>
      </v-btn>
    </template>

      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          Edit favorites
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="6">
              <v-combobox v-model="editedName" label="Name" outlined :items="names" deletable-chips></v-combobox>
            </v-col>
            <v-col sm="6">
              <v-text-field label="ICON URL" v-model="editedIcon_url" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-select :items="protocols" label="protocol" v-model="editedProtocol" outlined></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field label="IP or Hostname" v-model="editedHostname" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field label="Port" v-model="editedPort" single-line outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field label="path" v-model="editedPath" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="8">
              <v-text-field label="note" v-model="editedNote" single-line outlined></v-text-field>
            </v-col>
            <!-- color -->
            <v-col class="shrink" sm="4">
              <v-text-field v-model="editedColor" hide-details class="ma-0 pa-0" outlined>
                <template v-slot:append>
                  <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <div :style="swatchStyle" v-on="on" />
                    </template>
                    <v-card>
                      <v-card-text class="pa-0">
                        <v-color-picker v-model="editedColor" flat />
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
          <v-btn color="error" text @click="onDelete">
            delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="onCreate">
            accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['favorit'],
    data () {
      return {
        protocols: ['http', 'https'],
        names: ['PiHole', 'HomeAssistannt', 'XCP-ng', 'Nextclou', 'Phoscon-GW', 'Grafana', 'FritzBox', 'Prometheus', 'UniFi', 'OPNsense', 'Træfik', 'Cadvisor', 'OpenMediaVault'],
        editedProtocol: this.favorit.https,
        editedColor: this.favorit.color,
        id: this.favorit.id,
        menu: false,
        dialog: false,
        editedName: this.favorit.name,
        editedIcon_url: this.favorit.icon_url,
        editedHostname: this.favorit.hostname,
        editedPort: this.favorit.port,
        editedPath: this.favorit.path,
        editedNote: this.favorit.note,
      }
    },
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          name: this.editedName,
          icon_url: this.editedIcon_url,
          https: this.editedProtocol,
          hostname: this.editedHostname,
          port: this.editedPort,
          path: this.editedPath,
          note: this.editedNote,
          color: this.editedColor,
      }
      this.$emit('reloadfavorites')
      this.$http.put('http://'+process.env.VUE_APP_BOTURL+'/api/favorites/' + this.id, body).then();
      this.dialog = false
    },
    onDelete () {
    this.$emit('reloadfavorites')
    this.$http.delete('http://'+process.env.VUE_APP_BOTURL+'/api/favorites/' + this.id).then();
    this.dialog = false
    }
  },
  computed: {
  swatchStyle() {
    const { editedColor, menu } = this
    return {
      backgroundColor: editedColor,
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
