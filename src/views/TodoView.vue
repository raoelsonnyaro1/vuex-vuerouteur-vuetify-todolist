<template>
  <todo-item />
</template>
  
  <script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "Todo",

  components: {
    TodoItem,
  },
};
</script>