<template>
  <div class="">
    <h1>Welcome to</h1>
    <h1><b>Tonight's Cutlery.</b></h1>
    <div class="front-image">
      <img :src="require(`../assets/logo_transparent2.png`)" alt="">
    </div>

    <div class="description">
      <p>
        Book your dinner table online without any trouble. No more waiting on
        hold or calling, just enjoy stress-free dining at your favorite
        restaurant.
      </p>
    </div>

    <div class="get-started">
      <router-link to="/choose"><div class="button">Get Started</div></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import slika from "../assets/logo_transparent2.png"

export default {
  name: "GetStarted",
  components: {},
  data() {
    return {
      image: slika
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
h1 {
  margin-left: 60px;
  text-align: start;
  color: white;
  font-weight: 50;
  font-size: 55px;
}
h1 > b {
  font-weight: bold;
}
.front-image {
  margin-top: 45px;
}
.description > p {
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 50px 120px 0px 120px;
  line-height: 2;
}
.button {
  margin: 80px auto 0px auto;
  width: 40%;
  padding: 15px 0px;
  color: white;
  background-color: #1e90ff;
  font-size: 24px;
  border-radius: 25px;
}
a{
  text-decoration: none;
}

</style>
