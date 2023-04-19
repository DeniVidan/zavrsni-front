<template>
  <div class="tables">
    <div class="title"><h1>Table arrangement</h1></div>
    <div class="content">
      <div class="add-table">
        <add-table :tables="tables" />
      </div>

      <div class="add-termin">
        <add-termin />
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";
import AddTable from "../components/AddTable.vue";
import AddTermin from "../components/AddTermin.vue";

export default {
  name: "Tables",
  data() {
    return {
      tables: [],
      email: Auth.getUserEmail(),
      currentUser: Auth.getUser(),
    };
  },
  components: {
    AddTable,
    AddTermin,
  },
  methods: {
    async getRestaurantTables() {
      try {
        let res = await Service.get("/restaurant/tables", {
          params: {
            email: this.email,
            id: this.currentUser.rows[0].id
          },
        });
        console.log("daj mi restauran tables: ", res);
        this.tables = res.data;
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },
  },
  mounted() {
    this.getRestaurantTables();
    console.log("get user id: ", this.currentUser.rows[0].id)
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
.tables {
  color: white;
  margin-left: 0px;
  font-size: 27px;
}
.title {
  margin-top: -50px;
}
.content {
    display: flex;
  justify-content: space-around;
    flex-direction: row;
  margin-top: 60px;
}
</style>
