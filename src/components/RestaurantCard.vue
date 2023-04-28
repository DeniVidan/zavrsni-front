<template>
  <div class="card" v-for="r in restaurants" :key="r.id">
    <div class="image">
      <img src="https://picsum.photos/200/200" alt="" />
    </div>
    <div class="content">
      
      <div class="title">
        <h1>{{ r.restaurant_name }}, <i>{{r.location}}</i></h1>
      </div>
      <div class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
        corrupti sunt laboriosam, eaque laborum quod eos. Sit reprehenderit rem
        pariatur.
      </div>
      <div class="interactive">
        <router-link :to="{ name: 'restaurantopen', params: { id: r.id } }" class="button">Button</router-link>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurants: Object,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  background: #333333;
  height: 200px;
  max-width: 800px;
  border-radius: 15px;
}
.title {
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
}
.text {
    padding: 0px 10px;
}
i {
    font-weight: normal;
    font-size: 20px;
}
.button {
    background-color: #1E90FF;
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
