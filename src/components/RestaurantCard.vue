<template>
  <div class="card" v-for="r in filteredRestaurants" :key="r.id">
    <div class="image">
      <img
        style="object-fit: cover"
        :src="r.image"
        alt=""
        width="250"
        height="250"
      />
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
          readonly
        ></v-rating>
        <pre>{{ r.avg_rate }} <span style="font-size: 15px; font-weight: normal;" v-if="!r.avg_rate">NOT RATED YET</span></pre>
      </div>
      <div class="description">
        {{ r.description }}
      </div>
      <div class="interactive">
        <router-link
          :to="{ name: 'restaurantdetail', params: { id: r.restaurant_id } }"
          :r="r"
          class="button"
          style="width: auto; background-color: transparent; border: 1px solid #1e90ff"
          >VIEW <img class="pl-1" :src="eyeImg" alt=""
        /></router-link>

        <router-link
          :to="{ name: 'restaurantopen', params: { id: r.restaurant_id } }"
          class="button"
          >BOOK</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";
import eyeImg from "../assets/eye.png";

export default {
  name: "RestaurantCard",
  props: {
    filteredRestaurants: Object,
    searchItem: String,
  },
  data() {
    return {
      currentUser: Auth.getUser(),
      eyeImg: eyeImg,
    };
  },
  methods: {
    async getRating(restaurants_id) {
      try {
        console.log("dada: ", this.currentUser.id);
        let res = await Service.get("/restaurant/rating", {
          params: {
            restaurant_id: restaurants_id,
            user_id: this.currentUser.id,
          },
        });
        console.log("GET RATE: ", res.data.result.length);
        if (res.data.result.length == 0) {
          return true;
        } else {
          /*             const element = document.getElementById("rating");
            element.setAttribute("readonly", ""); */
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async makeRating(restaurants_id, rate) {
      if ((await this.getRating(restaurants_id)) == true) {
        try {
          let res = await Service.post("/rate", {
            restaurant_id: restaurants_id,
            user_id: this.currentUser.id,
            rate: rate,
          });

          console.log("rate res: ", res);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("THIS USER HAS ALREADY RATED THIS RESTAURANT!");
        alert("You have already rated this restaurant!");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  background: #333333;
  height: 250px;
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
.description {
  padding: 0px 10px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}
i {
  font-weight: normal;
  font-size: 20px;
}
.interactive {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.button {
  display: flex;
  background-color: #1e90ff;
  width: 80px;
  padding: 5px 10px;
  margin: 0;
  justify-content: center;
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  align-self: center;
}

img {
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
}
</style>
