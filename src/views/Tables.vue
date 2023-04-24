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

      <div class="get-table">
        <get-table />
      </div>

      <div class="get-termin">
        <get-termin />
      </div>

    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";
import AddTable from "../components/AddTable.vue";
import AddTermin from "../components/AddTermin.vue";
import GetTable from "../components/GetTable.vue";
import GetTermin from "../components/GetTermin.vue";

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
    GetTable,
    GetTermin
  },
  methods: {
    async getRestaurantTables() {
      try {
        let res = await Service.get("/restaurant/tables", {
          params: {
            email: this.email,
            id: this.currentUser.id
          },
        });
        console.log("daj mi restauran tables(tables): ", res);
        this.tables = res.data;
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },
  },
  mounted() {
    this.getRestaurantTables();
    console.log("get user id: ", this.currentUser.id)
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
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    
  margin-top: 60px;
}
.add-table, .add-termin {
  margin-right: 30px;
}
.add-table, .add-termin, .get-table, .get-termin {
  margin-bottom: 30px
}
.get-table {
  margin-right: 30px !important;
}
</style>
