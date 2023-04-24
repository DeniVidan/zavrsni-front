<template>
  <div class="schedule">
    <!-- SCHEDULE RUTA {{ email }} -->
    <div class="title">
      <h1>Reservations</h1>
    </div>

    <div class="add-table-msg" v-if="tableNumber">
      <h1>
        Please set up your table arrangement at
        <img @click="chairPath()" class="chair" :src="chairImg" alt="" /> before
        you start using the application.
      </h1>
    </div>

    <div class="content">

      <div class="wraper" v-for="(i, group) in groupedTables" :key="i">
        <table class="" >
          <div style="font-size: 26px; font-weight: bold;">{{group}}<img style="padding-left: 7px" :src="chairImg" alt=""></div> 
          <tr>
            <th></th>
            <th  style="padding-left: 30px" v-for="termin, index in termins" :key="index">
              {{ termin.start_time }} - {{ termin.end_time }}
            </th> 
          </tr>
          <tr v-for="table, index in tables" :key="index">
            <div v-if="table.table_size == group">{{ table.table_name }}</div>
            <td></td>
            <td></td>
            <td></td>
          </tr>
       
        </table>
      </div>
<div style="background: #ff9499; font-weight: bold; width: 20px; margin-top: 20px">{{ count }}</div>





<!--       <div class="group-table-title">
        <table>
          <tr>
            <th></th>
            <th style="padding-left: 30px" v-for="(termin, index) in termins" :key="index">{{ termin.start_time }} - {{ termin.end_time }}</th>
          </tr>
          <tr style="display: flex; flex-direction: column; background-color: #333333; margin-bottom: 20px" v-for="(tables, size) in groupedTables" :key="size">
            <td class="group-table-title">{{ size }} <img :src="chairImg" alt=""> </td>
            <td class="group-table-content" v-for="table in tables" :key="table.id">{{ table.table_name }}</td>
          </tr>
          
        </table>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Auth, Service } from "../services/services";
import chairImg from "../assets/chair.png";

export default {
  name: "AdminSchedule",
  data() {
    return {
      currentUser: Auth.getUser(),
      email: Auth.getUserEmail(),
      tableNumber: false,
      chairImg: chairImg,
      tables: [],
      groupedTables: {},
      termins: [],
      count: 0,
    };
  },
  methods: {

    counter() {
      for (let index in this.groupedTables) {
        /* if(this.tables[i].table_size == this.table[i-1].table.size){
          this.count++
        } */
        console.log("fuckoff: ", index, this.groupedTables[index])
        this.count++
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

        if (res.data.result == 0) {
          this.tableNumber = true;
        } else this.tableNumber = false;

        console.log("daj mi restauran tablesyxx: ", res.data.result);
        this.tables = res.data.result;
        this.groupedTables = this.groupTablesBySize(this.tables);
        this.termins = this.getTermins(this.tables);
        this.counter()
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },
        async getRestaurantTermins() {
      try {
        let res = await Service.get("/restaurant/termins", {
          params: {
            email: this.email,
            id: this.currentUser.id,
          },
        });

        this.termins = res.data.result;
        console.log("daj mi restauran termins: ", this.termins);
      } catch (error) {
        console.log("error za restoran termins: ", error);
      }
    },

    chairPath() {
      this.$router.push({ path: "/tables" });
    },

    groupTablesBySize(tables) {
      return tables.reduce((groups, table) => {
        const { table_size } = table;
        if (!groups[table_size]) {
          groups[table_size] = [];
        }
        groups[table_size].push(table);
        return groups;
      }, {});
    },

    getTermins(tables) {
      let termins = new Set();
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        termins.add(table.termin);
      }
      return Array.from(termins).sort();
    },
  },
  computed: {
    filteredTables() {
      return (group) => {
        return this.tables.filter((table) => {
          console.log("penis ", table.table_size)
          return table.table_size === group;
        });
      };
    },
  },
  mounted() {
    this.getRestaurantTables();
    this.getRestaurantTermins()
    console.log("ovo je length: ", this.termins);
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
  background-color: #1e90ff;
}
.content {
  margin-top: 70px;
}
.group-table-title {
  margin: 10px;
  background-color: transparent;
}
.group-table-content {
  margin: 10px;
  background-color: transparent;
}
.wraper {
  margin-top: 30px;
  background-color: #313131;
}
tr {
  
}
</style>
