<template>
  <div class="home">
    <restaurant-card :restaurants="restaurants" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { Auth, Service } from "../services/services";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  name: "HomeView",
  components: {
    RestaurantCard,
  },
  data() {
    return {
      restaurants: [],
    };
  },

  methods: {
    async getUsers() {
      try {
        let res = await Service.get("/users");
        console.log("daj mi usere: ", res);
      } catch (error) {
        console.log("error za usere: ", error.response);
      }
    },

    async getRestaurants() {
      try {
        let res = await Service.get("/restaurants");
        console.log("daj mi resturane: ", res.data.result);
        this.restaurants = res.data.result;
      } catch (error) {
        console.log("error za usere: ", error.response);
      }
    },
  },

  mounted() {
    this.getUsers();
    this.getRestaurants();
    console.log("localstorage: ", Auth.getUser().email);
  },
};
</script>

<style scoped>
.home {
  color: white;
  margin-top: 100px;
}
</style>
