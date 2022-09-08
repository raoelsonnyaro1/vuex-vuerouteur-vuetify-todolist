<template>
  <div>
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
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.id }}</td>
          <td>
            <v-checkbox
              :input-value="props.item.completed"
              primary
              hide-details
              @change="updateTodo(todo)"
            ></v-checkbox>
          </td>
          <td>{{ props.item.title }}</td>
          <td><v-btn :value="btnSupprimer" @click.prevent="deleteTodo(todo)">
              </v-btn></td>
        </tr>
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
    ...Vuex.mapGetters(["todos"]),
  },

  mounted() {
    this.$store.dispatch("fetchTodos");
  },
  }
</script>
