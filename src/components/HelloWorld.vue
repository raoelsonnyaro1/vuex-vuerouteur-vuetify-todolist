<template>
  <v-container>
     <v-data-table
    :headers="headers"
    :items="todos"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </v-container>
</template>

<script>
  export default {
    store: store,
    name: 'HelloWorld',

    data: () => ({
      headers: [
          {
            text: 'Id',
            align: 'start',
            value: 'id',
          },
          { text: 'Completed', value: 'completed' },
          { text: 'Title', value: 'title' },
          { text: 'Action', value: 'action' },
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
