<template>
  <div class="card" v-for="r in filteredRestaurants" :key="r.id">
    <div class="image">
      <img :src="r.image" alt="" width="250" height="250"/>
    </div>
    <div class="content">
      <div class="title">
        <h1>
          {{ r.restaurant_name }}, <i>{{ r.location }}</i>
        </h1>
      </div>
      <div class="review">
        <v-rating
        id="rating"
          v-model="r.avg_rate"
          color="grey"
          active-color="yellow-accent-4"
          hover
          half-increments
          size="23px"
          
          @change="makeRating(r.restaurant_id, r.avg_rate)"
        ></v-rating><pre>{{ r.avg_rate }} <span style="font-size: 15px; font-weight: normal;" v-if="!r.avg_rate">NOT RATED YET</span></pre>
        
      </div>
      <div class="text">
        {{r.description}}
      </div>
      <div class="interactive">
        <router-link
          :to="{ name: 'restaurantopen', params: { id: r.restaurant_id } }"
          class="button"
          >Button</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";

export default {
  name: "RestaurantCard",
  props: {
    filteredRestaurants: Object,
    searchItem: String
  },
  data() {
    return {
      currentUser: Auth.getUser(),
      
    };
  },
  methods: {

    async getRating(restaurants_id) {
        try {
          console.log("dada: ", this.currentUser.id)
          let res = await Service.get("/restaurant/rating", {
              params: {
                restaurant_id: restaurants_id,
                user_id: this.currentUser.id,
              }
          });
          console.log("GET RATE: ", res.data.result.length)
          if(res.data.result.length == 0) {
            return true
          } else {
/*             const element = document.getElementById("rating");
            element.setAttribute("readonly", ""); */
            return false
          }
          
        } catch (error) {
          console.log(error)
        }
    },


    async makeRating(restaurants_id, rate) {
      
      if (await this.getRating(restaurants_id) == true){
        try {
        let res = await Service.post("/rate", {
            restaurant_id: restaurants_id,
            user_id: this.currentUser.id,
            rate: rate,
        });

        console.log("rate res: ", res)
      } catch (error) {
        console.log(error)
      }
      } else {
        console.error("THIS USER HAS ALREADY RATED THIS RESTAURANT!")
        alert("You have already rated this restaurant!");
      }
      
    },
    
    test() {
      console.log("testiramo===========!")
    }
  },
  mounted() {
    this.filteredRestaurants.forEach(element => {
      console.log("cigan: ", element)
    });
    console.log(this.currentUser)
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  background: #333333;
  min-height: 250px;
  max-width: 800px;
  border-radius: 15px;
}
.title {
  display: flex;
  flex-direction: row;
  padding: 10px 20px 0px 20px;
}
.review {
  display: flex;
  margin-left: 25px;
  margin-bottom: 10px;
  gap: 10px;
}
.review pre {
  font-weight: bold;
  font-size: 20px;
}
.text {
  padding: 0px 10px;
}
i {
  font-weight: normal;
  font-size: 20px;
}
.button {
  background-color: #1e90ff;
  width: 80px;
  padding: 5px 10px;
  margin: 0;
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
}
img {
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
}
</style>
