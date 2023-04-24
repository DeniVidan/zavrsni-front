<template>
  <div class="table">
    <div class="card-title">Manage your tables</div>
    <div class="card-lr">
      <div class="left">SIZE</div>
      <div class="right">NAME</div>
      <div class="delete-row">Remove</div>
    </div>
    <div class="item" v-for="(table, index) in tables" :key="index">
      <div class="table-size">{{ table.table_size }}</div>
      <div class="table-name">
        <input
          type="text"
          @input="updateInput(index, 'table_name', $event.target.value)"
          :value="table.table_name"
          placeholder="Enter name"
        />
      </div>
      <div @click="removeTable(index, table.id)" class="close-btn"></div>
    </div>
    <div @click="nameTables()" class="button">SUBMIT</div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";

export default {
  name: "GetTable",
  data() {
    return {
      tables: [],
      email: Auth.getUserEmail(),
      currentUser: Auth.getUser(),
      table_size: [],
      table_name: [],
    };
  },
  methods: {
    async nameTables() {
      try {
        for (let i = 0; i < this.tables.length; i++) {
          let res = await Service.put("/rename/tables", {
            restaurant_id: this.currentUser.id,
            table_id: this.tables[i].id,
            table_name: this.tables[i].table_name,
          });

          console.log("PUT REQUEST RENAME TABLES: ", res);
        }
      } catch (error) {
        console.log("PUT REQUEST RENAME ERROR: ", error);
      }
    },

    async getRestaurantTables() {
      try {
        let res = await Service.get("/restaurant/tables", {
          params: {
            email: this.email,
            id: this.currentUser.id,
          },
        });

        this.tables = res.data.result;
        //console.log("daj mi restauran tables: ", this.tables);
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },

    async removeTable(index, id) {
      console.log("table id: ", id);
      try {
        let res = await Service.delete("/delete/table", {
          params: {
            id: id,
          },
        });

        console.log("table deletition: ", res);

        this.tables.splice(index, 1);
      } catch (error) {
        console.log("table deletition error: ", error);
      }
    },

    updateInput(index, key, value) {
      this.tables[index][key] = value;
    },
    /* submit() {
      console.log("stolovi HEHE: ", this.tables);
    }, */
  },
  mounted() {
    this.getRestaurantTables();
  },
};
</script>

<style scoped>
.table {
  background-color: #333333;
  color: white;
  width: 268px;
}
.card-title {
  font-size: 23px;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  padding: 10px;
  justify-content: center;
}
.card-lr {
  display: flex;
  flex-direction: row;
  font-size: 18px;
}
.left,
.right {
  width: 50%;
  font-weight: bold;
}
.delete-row {
  font-weight: bold;
}
.item {
  display: flex;
  flex-direction: row;
}
input {
  color: black;
  font-weight: bold;
  background-color: white;
  border: 1px solid #333333;
  width: 100%;
  padding-left: 10px;
}
.table-size {
  width: 50%;
}
.table-name {
  width: 50%;
}
::placeholder {
  font-size: 15px;
}
.button {
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 22px;
  background-color: #1e90ff;
  cursor: pointer;
  justify-content: center;
}
.close-btn {
  background: url("@/assets/close.png") center no-repeat;
  width: 90px;
  cursor: pointer;
}
</style>
