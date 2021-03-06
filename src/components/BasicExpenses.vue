<template>
  <section>
    <ExpensesList
      @editExpense="setEditExpense"
      @editFolder="setEditFolder"
    />
    <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            fab dark small color="red"
            @click="setAppendingExpense"
          >
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
        </template>
        <span>Append expense</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            fab dark small color="green"
            @click="setAppendingFolder"
          >
            <v-icon>mdi-folder-outline</v-icon>
          </v-btn>
        </template>
        <span>Append folder</span>
      </v-tooltip>
    </v-speed-dial>
    <ExpenseDialog
      :open="expenseDialog"
      :expenseData="expenseData"
      @setAppending="setAppendingExpense"
      @setName="setExpenseName"
      @setAmount="setExpenseAmount"
      @setDescription="setExpenseDescription"
      @save="saveExpenseInfo"
      @close="closeExpenseDialog"
    />
    <FolderDialog
      :open="folderDialog"
      :folderData="folderData"
      @setAppending="setAppendingFolder"
      @setName="setFolderName"
      @save="saveFolderInfo"
      @close="closeFolderDialog"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ExpensesList from "@/components/ExpensesList";
import ExpenseDialog from "@/components/dialogs/ExpenseDialog";
import FolderDialog from "@/components/dialogs/FolderDialog";

export default {
  name: 'BasicExpenses',
  components: {FolderDialog, ExpenseDialog, ExpensesList},
  data() {
    return {
      fab: false,
      expenseDialog: false,
      folderDialog: false,
      editFlag: false,
      expenseData: {
        name: '',
        amount: 0,
        description: ''
      },
      folderData: {
        name: '',
      },
    };
  },
  computed: mapGetters([
    'basicExpenses',
  ]),
  methods: {
    setExpenseName(name) {
      this.expenseData.name = name;
    },
    setExpenseAmount(amount) {
      this.expenseData.amount = +amount;
    },
    setExpenseDescription(description) {
      this.expenseData.description = description;
    },
    setFolderName(name) {
      this.folderData.name = name;
    },
    closeExpenseDialog() {
      this.expenseDialog = false;
    },
    closeFolderDialog() {
      this.folderDialog = false;
    },
    saveExpenseInfo() {
      if (this.editFlag) {
        this.$store.dispatch('updateBasicExpense', this.expenseData);
      }
      else {
        this.$store.dispatch('addBasicExpense', this.expenseData);
      }
      this.expenseDialog = false;
    },
    saveFolderInfo() {
      if (this.editFlag) {
        this.$store.dispatch('updateFolder', this.folderData);
      }
      else {
        this.$store.dispatch('addFolder', this.folderData);
      }
      this.folderDialog = false;
    },
    setAppendingExpense() {
      this.editFlag = false;
      this.expenseData = {
        name: '',
        amount: 0,
      };
      this.expenseDialog = true;
    },
    setAppendingFolder() {
      this.editFlag = false;
      this.folderData = {
        name: '',
      };
      this.folderDialog = true;
    },
    setEditExpense(expense) {
      this.editFlag = true;
      this.expenseData = {...expense};
      this.expenseDialog = true;
    },
    setEditFolder(folder) {
      this.editFlag = true;
      this.folderData = {...folder};
      this.folderDialog = true;
    },
  },
};
</script>

<style scoped>

</style>
