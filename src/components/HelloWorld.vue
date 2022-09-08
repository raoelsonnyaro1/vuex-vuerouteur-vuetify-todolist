<template>
  <div>
    <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="todos"
      :search="search"
    >
    <template v-slot:item.completed="{ item }">
      <v-checkbox
              :input-value="item.completed"
              primary
              hide-details
              v-model="item.completed"
              @change="updateTodo(item)"
            ></v-checkbox>
    </template>
    <template v-slot:item.action="{ item }">
              <v-icon
        small
        @click.prevent="deleteTodo(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
  <v-text-field label="add todo" v-model="newTodo" @keypress.enter="addTodo(newTodo)"></v-text-field>
  </div>
 
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
      newTodo: "",
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
    ...Vuex.mapGetters(["todos"]),
  },

  mounted() {
    this.$store.dispatch("fetchTodos");
  },
  }
</script>
