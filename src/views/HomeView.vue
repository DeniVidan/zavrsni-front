<template>
  <div class="home">
      <restaurant-card v-for="i in is" :key="i"/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { Auth, Service } from "../services/services";
import RestaurantCard from "../components/RestaurantCard.vue"

export default {
  name: "HomeView",
  components: {
    RestaurantCard
  },
  data() {
    return {
      is: 3
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
    console.log("localstorage: ", Auth.getUser().email)
  },
};
</script>

<style scoped>
.home{
    color: white;
    margin-top: 100px;
}

</style>
