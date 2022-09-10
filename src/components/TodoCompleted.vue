<template v-show="hasCompleted">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="completedTodos"
        :items-per-page="5"
        :search="search"
      >
    
    </v-data-table>
    </v-card>
  </template>
  
  
  <script>
  import store from "@/store";
  import Vuex from "vuex";
  
  global.v = Vuex;
    export default {
      store: store,
      name: 'TodoCompleted',
  
      data: () => ({
        search: '',
        headers: [
            {
              text: 'Id',
              align: 'start',
              value: 'id',
            },
            { text: 'Title',sortable: false, value: 'title' },
          ],
        newTodo: "",
      }),
  
      

  
    computed: {
      ...Vuex.mapGetters(["completedTodos"]),
      hasCompleted() {
        return this.completedTodos.length > 0;
      },
    },
  
    mounted() {
      this.$store.dispatch("fetchCompletedTodos");
    },
    }
  </script>
  