<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn small fab v-on="on">
          <v-icon color="success" light>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          Add Subnet
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="6">
              <v-text-field label="NAME" v-model="name" single-line outlined></v-text-field>
            </v-col>
            <v-col sm="6">
              <v-text-field label="192.168.1.0/24" v-model="subnet" single-line outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12">
              <v-text-field label="NOTE" v-model="note" single-line outlined></v-text-field>
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
      menu: false,
      dialog: false,
      name: '',
      subnet: '',
      note: '',
    }),
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          subnet_name: this.name,
          subnet: this.subnet,
          note: this.note,
      }
      this.$emit('reloadsubnets')
      this.$http.post('http://192.168.213.15:3000/api/subnets', body).then();
      this.dialog = false
    }
  }
}
</script>
