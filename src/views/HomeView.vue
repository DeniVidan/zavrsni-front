<template>
  <div class="home">
    HOME RUTA
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { Auth, Service } from "../services/services";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
    }
  },

  methods: {
    async getUsers() {
      try {
        let res = await Service.get("/users")
        console.log("daj mi usere: ", res)
      } catch (error) {
        console.log("error za usere: ", error.response)
      }
    }
  },

  mounted() {
    this.getUsers()
  },
};
</script>

<style scoped>
.home{
    color: white;
    margin-top: 40px;
}

</style>
