<template>
  <div class="container">
    <div @click="goBack()" class="go-back">
      <div class="back-img">
        <font-awesome-icon
          class="icon mr-5"
          icon="fa-reguler fa-chevron-left"
        />
      </div>
      <div class="title ml-5">back</div>
    </div>
    <div class="content">



      <div class="title">
        {{ restaurants.restaurant_name }}, <i>{{ restaurants.location }}</i>
      </div>

      <div class="filters">
        <div class="seat-filter">
          <div @click="toggle()" class="seat-title">Seat</div>
          <div
            class="collapse"
            v-show="isToggle"
            v-for="(i, group) in groupedTables"
            :key="i"
          >
            <div class="item">
              {{ group }}
            </div>
          </div>
        </div>
      </div>
      <div class="filters">
        <div class="termin-filter">
          <div @click="toggle2()" class="termin-title">Termin</div>
          <div
            class="collapse"
            v-show="isToggle2"
            v-for="(termin, index) in termins"
            :key="index"
          >
            <div class="item">
              {{ termin.start_time }} - {{ termin.end_time }}
            </div>
          </div>
        </div>
      </div>

    <div class="tables">
        <div class="card" v-for="table in tables" :key="table">
            size: {{ table.table_size }}
        </div>
    </div>

    </div>
  </div>
</template>

<script>
import Restaurant from "../components/Restaurant.vue";
import { Auth, Service } from "../services/services";

export default {
  name: "RestaurantOpen",
  components: {
    Restaurant,
  },
  props: {},
  data() {
    return {
      currentUser: Auth.getUser(),
      email: Auth.getUserEmail(),
      isToggle: false,
      isToggle2: false,
      restaurants: [],
      termins: [],
      tables: [],
      groupedTables: {},
      filter_data: [],
    };
  },
  methods: {
    async getRestaurant() {
      try {
        let res = await Service.get("/restaurant", {
          params: {
            id: this.$route.params.id,
          },
        });
        console.log("daj mi resturan: ", res.data.result);
        this.restaurants = res.data.result[0];
      } catch (error) {
        console.log("error za restoran: ", error);
      }
      this.getRestaurantTermins();
      this.getRestaurantTables();
    },

    async getRestaurantTables() {
      try {
        let res = await Service.get("/restaurant/tables", {
          params: {
            email: this.email,
            id: this.restaurants.id,
          },
        });

        console.log("daj mi restauran tablesyxx: ", res.data);
        this.tables = res.data.result;
        this.groupedTables = this.groupTablesBySize(this.tables);

        console.log("ta stvar: ", this.groupedTables);
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },

    async getRestaurantTermins() {
      try {
        let res = await Service.get("/restaurant/termins", {
          params: {
            email: this.email,
            id: this.restaurants.id,
          },
        });

        this.termins = res.data.result;
        console.log("daj mi restauran termins: ", this.termins);
      } catch (error) {
        console.log("error za restoran termins: ", error);
      }
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

    applyFilter(item){
        this.filter.push(item)
    },

    goBack() {
      this.$router.go(-1);
    },
    toggle() {
      this.isToggle = !this.isToggle;
    },
    toggle2() {
      this.isToggle2 = !this.isToggle2;
    },
  },
  mounted() {
    console.log("id od restorana: ", this.$route.params.id);
    this.getRestaurant();
  },
};
</script>

<style scoped>
.container {
  color: white;
}
.go-back {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;
  font-size: 45px;
  padding: 10px;
  width: 200px;
}
.go-back > .title {
  font-weight: normal;
}
i {
  font-weight: normal;
  font-size: 28px;
}

.title {
  font-size: 40px;
  font-weight: bold;
}
.wraper {
  display: flex;
}

.content {
  margin-top: 30px;
}
.filters {
  display: flex;
  font-size: 22px;
  margin-left: 30px;
  margin-top: 20px;
}
.seat-filter,
.termin-filter {
  background-color: #333333;
  border-radius: 15px;
}
.termin-title,
.seat-title {
  cursor: pointer;
  padding: 10px 30px;
}
.item {
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.item:hover {
    background-color: #8a8888;
}
.card {
    margin-top: 20px;
    background-color: #333333;
    padding: 10px;
    font-size: 20px;
    border-radius: 10px;
}
</style>
