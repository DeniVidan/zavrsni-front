<template>
  <div class="card">
    <div class="image">
      <img src="https://picsum.photos/170/170" alt="" />
    </div>
    <div class="content">
      <div class="title">
        <h1>Tivoli, <i>Pula</i></h1>
      </div>
      <div class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
        corrupti sunt laboriosam, eaque laborum quod eos. Sit reprehenderit rem
        pariatur.
      </div>
      <div class="interactive">
        <div class="button">Button</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
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
  margin-bottom: 20px;
  background: #333333;
  height: 170px;
  max-width: 800px;
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
    background-color: #2b67e9;
    width: 80px;
    padding: 5px 10px;
    margin: 0;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
}
</style>
