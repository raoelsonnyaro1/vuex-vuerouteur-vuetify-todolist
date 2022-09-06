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
      :items="todos"
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
    name: 'HelloWorld',

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

    
  methods: {
    ...Vuex.mapActions({
      addTodoStore: "addTodo",
      deleteTodoStore: "deleteTodo",
      updatedTodoStore: "updateTodo",
    }),

    addTodo(newTodo) {
      this.addTodoStore(newTodo);
      this.newTodo = "";
    },

    updateTodo(todo) {
      this.updatedTodoStore(todo);
    },

    deleteTodo(todo) {
      this.deleteTodoStore(todo);
    },
  },

  computed: {
    ...Vuex.mapGetters(["todos", "completedTodos"]),
    hasCompleted() {
      return this.completedTodos.length > 0;
    },
  },

  mounted() {
    this.$store.dispatch("fetchTodos");
  },
  }
</script>
