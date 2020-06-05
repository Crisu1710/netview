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
          Add manufacturer
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="6">
              <v-text-field label="NAME" v-model="name" single-line outlined></v-text-field>
            </v-col>
            <v-col sm="6">
              <v-text-field label="note" v-model="note" single-line outlined></v-text-field>
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
      note: '',
    }),
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          manufacturer_name: this.name,
          note: this.note,
      }
      this.$emit('reloadmanufacturers')
      this.$http.post('http://localhost:3000/api/manufacturers', body).then();
      this.dialog = false
    }
  }
}
</script>
