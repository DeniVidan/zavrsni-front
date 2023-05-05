<template>
  <div class="home">
    <div style="margin-top: -50px">
      <div class="search-bar" v-if="role">
        <div class="search-icon"></div>
        <div class="input">
          <input v-model="searchItem" type="search" placeholder="Search" />
        </div>
        <div
          v-if="searchItem"
          @click="clearSearchItem()"
          class="clear-icon"
        ></div>
      </div>
    </div>
    <div style="margin-top: 50px; font-size: 30px; text-align: center;" v-if="filteredRestaurants.length == 0">
      Sorry, no such restaurant !
    </div>

    <div style="margin-top: 50px">
      <restaurant-card
        :filteredRestaurants="filteredRestaurants"
        :searchItem="searchItem"
      />
    </div>
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
      getUserRole: Auth.getUserRole(),
      role: null,
      searchItem: "",
      temp_restaurants: [],
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
        this.temp_restaurants = res.data.result;
      } catch (error) {
        console.log("error za usere: ", error.response);
      }
    },
    /*
    async getRating() {
      try {
        let res = await Service.get("/restaurant/rating", {
          params: {
            restaurant_id:
          }
        });
      } catch (error) {}
    }, */

    clearSearchItem() {
      this.searchItem = "";
      this.restaurants = this.temp_restaurants;
    },
    isUser() {
      if (Auth.getUserRole() == "user") {
        this.role = true;
      } else if (Auth.getUserRole() == "admin") {
        this.role = false;
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },

  computed: {
  filteredRestaurants() {
    if (!this.searchItem) {
      return this.restaurants;
    }

    const lowercaseSearchWord = this.searchItem.toLowerCase();
    let temp = lowercaseSearchWord.split(" ");

    return this.restaurants.filter((restaurant) => {
      if (temp.length == 1) {
        return (
          restaurant.restaurant_name
            .toLowerCase()
            .includes(lowercaseSearchWord) ||
          restaurant.location.toLowerCase().includes(lowercaseSearchWord)
        );
      } else if (temp.length == 2 ) {
        let firstWord = temp[0];
        let secondWord = temp[1];

        return (
          restaurant.restaurant_name
            .toLowerCase()
            .includes(firstWord) &&
          restaurant.location.toLowerCase().includes(secondWord)
        );
      }
    });
  },
},


  mounted() {
    //this.getUsers();
    this.getRestaurants();
    this.isUser();
    console.log("localstorage: ", Auth.getUser().email);
  },
};
</script>

<style scoped>
.home {
  color: white;
}

.search-bar {
  display: flex;
  flex-wrap: row;
  margin: auto;
  background-color: #333333;
  max-width: 400px;
  border-radius: 35px;
}
::placeholder {
  color: white;
  opacity: 44%;
  margin-left: 20px !important;
}
.search-icon {
  margin-left: 15px;
  background: url("@/assets/search.png") left no-repeat;
  width: 40px;
  cursor: pointer;
}
input {
  padding: 15px 0px 15px 0px;
  color: white;
  width: 100%;
}
input:focus {
  outline: none;
}
.input {
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
  width: 100%;
}
.clear-icon {
  margin-right: 15px;
  background: url("@/assets/close.png") right no-repeat;
  width: 40px;
  cursor: pointer;
}
</style>
