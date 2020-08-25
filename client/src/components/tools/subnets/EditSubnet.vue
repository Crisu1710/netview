<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="warning" light>mdi-pencil</v-icon>
      </template>
      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          edit Subnet
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="6">
              <v-text-field label="NAME" v-model="editedName" single-line outlined></v-text-field>
            </v-col>
            <v-col sm="6">
              <v-text-field label="192.168.1.0/24" v-model="editedSubnet" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12">
              <v-text-field label="NOTE" v-model="editedNote" single-line outlined></v-text-field>
            </v-col>
          </v-row>
        </v-flex>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="warning" text @click="dialog = false">
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">
            delete
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
    props: ['subnet'],
    data () {
      return {
        id: this.subnet.id,
        menu: false,
        dialog: false,
        editedName: this.subnet.subnet_name,
        editedNote: this.subnet.note,
        editedSubnet: this.subnet.subnet,
      }
    },
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          subnet_name: this.editedName,
          note: this.editedNote,
          subnet: this.editedSubnet
      }
      this.$emit('reloadsubnets')
      this.$http.put('http://'+process.env.VUE_APP_BOTURL+'/api/subnets/' + this.id, body).then();
      this.dialog = false
    },
    onDelete () {
    this.$emit('reloadsubnets')
    this.$http.delete('http://'+process.env.VUE_APP_BOTURL+'/api/subnets/' + this.id).then();
    this.dialog = false
    }
  }
}
</script>
