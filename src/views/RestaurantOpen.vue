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
            <div @click="applyFilter(group)" class="item">
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
            <div
              @click="applyFilterTermin(termin.start_time, termin.end_time)"
              class="item"
            >
              {{ termin.start_time }} - {{ termin.end_time }}
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 85px; display: flex; flex-wrap: wrap">
        <div class="chosen-filter" v-for="filter in filter_data" :key="filter">
          <div class="filter-item" v-for="ff in filter" :key="ff">
            <div style="display: flex" @click="remove(ff)">
              <div style="font-size: 22px">{{ ff }}</div>

              <div>
                <img style="margin: 9px 0px 0px 15px" :src="closeImg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

<!--       <div class="wraper">
        <div v-if="filter_data.value1.length == 0">
          <h1 style="color: red">Please choose filter!</h1>
        </div>
        <div class="group" v-for="(index, group) in groupedTables" :key="index">
          <div v-for="f in filter_data.value1" :key="f">
            <div v-if="group == f" class="tables">
              <div @click="clicked" class="size">
                {{ group
                }}<img style="padding-left: 7px" :src="chairImg" alt="" />
              </div>
              <div id="card-body" class="hidden">
                <div class="card" v-for="table in tables" :key="table">
                  <div class="table" v-if="table.table_size == group">
                    <div style="width: 80px">size: {{ table.table_size }}</div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        margin-left: 30px;
                        width: 80%;
                      "
                    >
                      <div
                        @click="chooseTermin"
                        class="table-termin"
                        v-for="termin in termins"
                        :key="termin"
                      >
                        <div
                          v-for="reservation in reservations"
                          :key="reservation"
                        >
                          <div v-if="reservation.reservation_id">
                            {{ termin.start_time }} - {{ termin.end_time }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style="cursor: pointer; background: #1e90ff; width: 50px"
                    >
                      YES
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!--       <div  style="display: flex; flex-direction: column" class="cigan">
        <div v-for="reservation in reservations" :key="reservation">
          <div v-for="(index, group, s) in groupedTables" :key="index">
            
            <div v-if="group == reservation.table_size">
              <div>

              </div>
              {{group + "----" + reservation.table_name}} <br>
              --
            </div>
          </div>
        </div>

      </div> -->

      <!--   <div class="wraper">
        <div v-if="filter_data.value1.length == 0">
          <h1 style="color: red">Please choose filter!</h1>
        </div>
        <div class="group" v-for="(index, group) in groupedTables" :key="index">
          <div v-for="f in filter_data.value1" :key="f">
            <div v-if="group == f" class="tables">
              <div @click="clicked" class="size">
                {{ group
                }}<img style="padding-left: 7px" :src="chairImg" alt="" />
              </div>
              <div id="card-body" class="hidden">
                <div class="card" v-for="table in tables" :key="table">
                 
                  <div class="table" v-if="table.table_size == group">
                    <div style="width: 80px">size: {{ table.table_size }}</div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        margin-left: 30px;
                        width: 80%;
                      "
                    >
                      <div
                        @click="chooseTermin"
                        class="table-termin"
                        v-for="termin in termins"
                        :key="termin"
                      >
                       
                          <div>
                            <div v-for="reservation in reservations" :key="reservation">
                              <div v-if="termin.id != reservation.termin_id">
                                {{ termin.start_time }} - {{ termin.end_time }}
                              </div>
                            </div>
                            

                          </div>
                        
                      </div>
                    </div>

                    <div
                      style="cursor: pointer; background: #1e90ff; width: 50px"
                    >
                      YES
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 -->

      <!-- 
  <div class="kita" v-for="table in tables" :key="table">
    <div v-for="index, group in groupedTables" :key="index">
      <div v-if="table.table_size == group">
        {{table.table_name}}
        <div v-for="termin in termins" :key="termin">

          <div v-for="reservation in reservations" :key="reservation">
            <div v-if="termin.id == reservation.termin_id">{{termin.start_time}}</div>
          </div>
    
        </div>      
        <br>  
      </div> 
    </div>
  </div> -->

      <div class="wraper">

        <div class="tables">
        <div class="group" style="background: #222222; margin-bottom: 17px; border-radius: 10px" 
          v-for="(reservations, n) in groupedReservations"
          :key="reservations"
        >
          <div class="size" @click="clicked">
            {{ n }}
            <img style="padding-left: 7px" :src="chairImg" alt="" />
          </div>
          <div id="card-body" class="hidden">
            <div
              class="card"
              v-for="(reservation, k, l) in reservations"
              :key="reservation"
            >
             <p style="align-self: center"> SIZE: {{ reservation[l].table_size }} |</p>
              <div class="termin-wraper">
                <div class="termins" v-for="r in reservation" :key="r">
                  <div class="termin-item" v-if="!r.reservation_id">
                    <b>{{ r.start_time + "-" + r.end_time }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Restaurant from "../components/Restaurant.vue";
import { Auth, Service } from "../services/services";
import chairImg from "../assets/chair.png";
import closeImg from "../assets/close2.png";

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
      reservations: [],
      groupedTables: {},
      groupedReservations: {},
      filter_data: {
        value1: [],
        value2: [],
      },
      chairImg: chairImg,
      closeImg: closeImg,
      active: false,
      proba: {
        value1: [],
        value2: [],
      },
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
      this.getReservations();
      this.getRestaurantTables();

      //this.groupTables();
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
        this.groupedReservations = this.groupTablesBySizeAndName(
          this.reservations
        );

        console.log("ta stvar: ", this.groupedReservations);
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
    async getReservations() {
      try {
        let res = await Service.get("/restaurant/reservations", {
          params: {
            email: this.email,
            id: this.restaurants.id,
          },
        });

        this.reservations = res.data.result;
        console.log("daj mi restauran reservations: ", this.reservations);
      } catch (error) {
        console.log("error za restoran reservations: ", error);
      }
    },

    groupTablesBySizeAndName(tables) {
      return tables.reduce((groups, table) => {
        const { table_size, table_name } = table;
        if (!groups[table_size]) {
          groups[table_size] = {};
        }
        if (!groups[table_size][table_name]) {
          groups[table_size][table_name] = [];
        }
        groups[table_size][table_name].push(table);
        return groups;
      }, {});
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

    applyFilter(item) {
      if (!this.filter_data.value1.includes(item)) {
        this.filter_data.value1.push(item);
      }
      //console.log("filter: ", this.filter_data);
    },
    applyFilterTermin(item1, item2) {
      let temp = item1 + "-" + item2;
      /* temp = temp.split("-")
      console.log("terljnim: ", temp) */

      if (!this.filter_data.value2.includes(temp)) {
        this.filter_data.value2.push(temp);
      }
      console.log(this.filter_data.value2);
    },

    remove(item) {
      if (this.filter_data.value1.includes(item)) {
        const num = this.filter_data.value1.indexOf(item);
        this.filter_data.value1.splice(num, 1);
      } else if (this.filter_data.value2.includes(item)) {
        const num = this.filter_data.value2.indexOf(item);
        console.log("remve termin: ", num);
        this.filter_data.value2.splice(num, 1);
      }

      /*       this.setFilter() */
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

    clicked(event) {
      const groupElement = event.target.closest(".group");
      const tableBodyElement = groupElement.querySelector("#card-body");

      if (!tableBodyElement.classList.contains("hidden")) {
        tableBodyElement.classList.add("hidden");
      } else {
        tableBodyElement.classList.remove("hidden");
      }
    },

    /*     setFilter() {
      if (this.filter_data.length == 0) {
        return true;
      } else {
        return false;
        }
    }, */
    chooseTermin(event) {
      this.selectedTermin = event.target.innerText;
      console.log(event.target.innerText);
    },
    reserveTable() {},
  },

  mounted() {
    console.log("id od restorana: ", this.$route.params.id);
    this.getRestaurant();
    /*     this.setFilter() */
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
  margin-top: 0px;
}
.group {
  border-radius: 10px;
}
.content {
  margin-top: 30px;
}
.filters {
  position: absolute;
  display: flex;
  font-size: 22px;
  margin-left: 30px;
  margin-top: 20px;
}
.filters > .termin-filter {
  margin-left: 150px;
  z-index: 1;
}
.seat-filter {
  z-index: 2;
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
#card-body {
  margin-bottom: 10px;
  padding-bottom: 1px;
}
.card {
  display: flex;
  padding: 20px;
  margin: 10px;
  background-color: #333333;
  font-size: 20px;
  border-radius: 10px;
}
.tables {
  background: #1a1a1a !important;
  padding-bottom: 5px;

}
.table {
  display: flex;
  padding: 10px;
}
.table-termin {
  cursor: pointer;
  padding: 2px 20px;
  border-radius: 10px;
  background-color: #535353;
  margin-left: 20px;
}

.size {
  font-size: 30px;
  font-weight: bold;
  padding: 10px 30px;
  cursor: pointer;
}
.hidden {
  display: none;
}
.chosen-filter {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-top: 15px;
}
.filter-item {
  background: #1e90ff;
  padding: 10px 25px;
  border-radius: 5px;
  margin-left: 10px;
  position: relative;
  cursor: pointer;
  font-weight: bold;
  max-height: 208px;
}
.filter-item > img {
  align-self: center;
}
.termin-wraper {
  display: flex;
  width: 90%;
  
}

.termin-item {
  background-color: #636363;
  padding: 8px 15px;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  
}
</style>
