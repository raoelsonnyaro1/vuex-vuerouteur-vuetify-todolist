import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const resource_uri = "https://jsonplaceholder.typicode.com/todos/";

const state = {
  todos: [],
};

const getters = {
  todos: (state) => state.todos,
  completedTodos: (state) => state.todos.filter((todo) => todo.completed),
  remainingTodos: (state) => state.todos.filter((todo) => !todo.completed),
  completedTodosCount: (state) => getters.completedTodos(state).length,
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  setCompletedTodos: (state, completedTodos) => (state.completedTodos = completedTodos),

  update_todo: (state, updatedTodo) => {
    const index = state.todos.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },

};

const actions = {
  async fetchTodos({
    commit
  }) {
    const response = await axios.get(resource_uri);
    commit("setTodos", response.data);
  },

  async fetchCompletedTodos({
    commit
  }) {
    const response = await axios.get(resource_uri);
    commit("setCompletedTodos", response.data);
  },

  async addTodo({
    commit,state
  }, todo) {
    const response = await axios.post(resource_uri, todo);
    commit("setTodos", [...state.todos,{
      id:state.todos[state.todos.length-1].id+1,
      title: todo,
      completed: false,
    }]);
  },

  async updateTodo({
    commit
  }, todo) {
    const response = await axios.put('${resource_uri}${todo.id}', todo);
    commit("update_todo", response.data);
  },

  async deleteTodo({
    commit,state
  }, todo) {
    const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const test = [...state.todos];
    commit("setTodos", test.filter((t) => t.id !== todo.id));
  },
};

let store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
});

global.store = store;

export default store;