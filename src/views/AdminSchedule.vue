<template>
  <div class="schedule"><!-- SCHEDULE RUTA {{ email }} -->
  <div class="title">
    <h1>Reservations</h1>
  </div>
  
    <div class="add-table-msg" v-if="!tableNumber">
        <h1>Please set up your table arrangement at <img @click="chairPath()" class="chair" :src="chairImg" alt=""> before you start using the application.</h1>  
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";
import chairImg from "../assets/chair.png"

export default {
  name: "AdminSchedule",
  data() {
    return {
      email: Auth.getUserEmail(),
      tableNumber: null,
        chairImg: chairImg
    };
  },
  methods: {
    async getRestaurantTables() {
      try {
        let res = await Service.get("/restaurant/tables", {
          params: {
            email: this.email,
          },
        });
        console.log("daj mi restauran tables: ", res);
        this.tableNumber = res.data.result
            
        
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },

    chairPath(){
        this.$router.push({path: "/tables"})
    },


  },
  mounted() {
    this.getRestaurantTables();
  },
};
</script>

<style scoped>
* {
    text-align: center;
}
.schedule {
  color: white;
}
.title {
     margin-top: -50px;
}
.title > h1 {
    font-size: 40px;
}
.add-table-msg {
    margin-top: 60px;
}
.add-table-msg > h1 {
    font-size: 40px;
}
.chair {
    cursor: pointer;
    padding: 20px;
    margin-bottom: -17px;
    border-radius: 100%;
    background-color: #464646;
}
.chair.active,
.chair:hover {
  color: white;
  background-color: #1E90FF;
  
}
</style>
