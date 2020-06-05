<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="warning" light>mdi-pencil</v-icon>
      </template>
      <v-card>
        <v-card-title xs3 class="headline text-uppercase" primary-title>
          edit Device
        </v-card-title>
        <v-flex ml-5 mr-5 class="text-uppercase">
          <v-row>
            <v-col sm="9">
              <v-text-field label="type" v-model="editedType" single-line outlined></v-text-field>
            </v-col>
            <v-col sm="3">
              <v-text-field label="amount" v-model="editedAmount" single-line outlined></v-text-field>
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
          <v-btn color="error" text @click="onDelete">
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
    props: ['device'],
    data () {
      return {
        id: this.device.id,
        menu: false,
        dialog: false,
        editedType: this.device.type,
        editedNote: this.device.note,
        editedAmount: this.device.amount,
      }
    },
    methods: {   //post the info to DB
      onCreate () {
      const body = {
          type: this.editedType,
          note: this.editedNote,
          amount: this.editedAmount
      }
      this.$emit('reloaddevices')
      this.$http.put('http://localhost:3000/api/devices/' + this.id, body).then();
      this.dialog = false
    },
    onDelete () {
    this.$emit('reloaddevices')
    this.$http.delete('http://localhost:3000/api/devices/' + this.id).then();
    this.dialog = false
    }
  }
}
</script>
