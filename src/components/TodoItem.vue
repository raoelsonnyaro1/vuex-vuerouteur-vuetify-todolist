.<template>
  <div class="todo">
    <router-link to="/">&lt; Back</router-link>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4"></div>
          <v-list-item-title class="mb-1">
            <ul>
              <li>id:{{ todo.id }}</li>
              <li>title:{{ todo.title }}</li>
              <li>completed:{{ todo.completed }}</li>
            </ul>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
  
  <script>
import store from "@/store";
import Vuex from "vuex";

global.v = Vuex;

export default {
  store: store,
  name: "Todo",

  computed: {
    ...Vuex.mapGetters(["todo"]),
  },
  mounted() {
    this.$store.dispatch("getTodo", { id: this.$route.params.id });
  },
};
</script>