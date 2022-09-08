<template>
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
        :search="search"
      ></v-data-table>
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
            { text: 'Completed',sortable: false, value: 'completed' },
            { text: 'Title',sortable: false, value: 'title' },
            { text: 'Action',sortable: false, value: 'action' },
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
  