<template>
  <v-dialog
    :value="open"
    @click:outside="$emit('close')"
    max-width="370px"
  >
    <v-card>
      <v-card-title class="text-h5">
        Folder information
      </v-card-title>
      <v-col @keydown.enter="$emit('save')">
        <v-text-field
          outlined
          label="Folder name"
          :value="folderData.name"
          @input.native="$emit('setName', $event.target.value)"
        ></v-text-field>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          color="primary darken-1"
          text
          @click="$emit('save')"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FolderDialog",
  props: {
    open: {
      type: Boolean,
      required: true
    },
    folderData: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
