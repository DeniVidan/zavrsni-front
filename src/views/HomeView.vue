<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ this.proba }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data(){
    return {
      proba: ""
    }
  },
  methods: {
    async get(){
      let res = await axios.get("http://localhost:3000/api/a")
      this.proba = res.data
      console.log(res.data)
    }
   
  },
  mounted(){
    this.get()
  }
};
</script>
