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

      <div style="display: flex; flex-direction: row">
        <div class="choose-date">
          <input
            @change="setDay()"
            class="date-picker"
            type="date"
            v-model="picker"
          />
        </div>

        <div v-if="currentUser.role == 'admin'">
          <v-text-field
            v-model="name"
            :counter="10"
            label="Enter name"
            style="width: 250px; margin-left: 30px"
            required
          ></v-text-field>
        </div>
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

      <div v-if="termin_id" class="selected-termin">
        <div
          class="termin-item"
          style="font-weight: bold; background-color: #1e90ff"
        >
          {{ start_time + "-" + end_time }}
        </div>
        <div
          style="
            align-self: center;
            float: right;
            display: flex;
            justify-content: flex-end;
            height: 40px !important;
            display: grid;
            align-content: center;
          "
          @click="reserveTable()"
        >
          <div style="padding: 8px 0px" class="button">Book</div>
        </div>
        <div
          @click="removeChosenTermin()"
          style="
            cursor: pointer;
            align-content: center;
            display: grid;
            background-color: #ff4444;
            padding: 0px 10px;
            border-radius: 10px;
          "
        >
          <img :src="closeImg" alt="" />
        </div>
      </div>

      <div
        style="
          margin-top: 85px;
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
        "
      >
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

      <div class="wraper">
        <div
          v-if="filter_data.value1.length == 0"
          style="font-size: 30px; font-weight: bold; color: red"
        >
          Please select seat and termin filter
        </div>
        <div class="tables">
          <div
            class="group"
            style="
              background: #222222;
              margin-bottom: 17px;
              border-radius: 10px;
            "
            v-for="(reservations, n) in groupedReservations"
            :key="reservations"
          >
            <div v-for="ff in filter_data.value1" :key="ff">
              <div v-if="n == ff || filter_data.value1.length == 0">
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
                    <div class="one-table" v-if="reservation[l]">
                      <!-- {{reservation[l].reservation_id}} -->
                      <p style="align-self: center; width: 70px">
                        SIZE: {{ reservation[l].table_size }}
                      </p>
                      <div class="termin-wraper">
                        <div
                          class="termins"
                          v-for="(r, br) in reservation"
                          :key="br"
                        >
                          <div v-for="f2 in filter_data.value2" :key="f2">
                            <div
                              id="termin"
                              class="termin-item"
                              v-if="f2 == r.start_time + '-' + r.end_time"
                              @click="changeColor"
                            >
                              <b
                                @click="
                                  chooseTermin(
                                    r.termin_id,
                                    r.tables_id,
                                    r.restaurant_id,
                                    r.start_time,
                                    r.end_time
                                  )
                                "
                                >{{ r.start_time + "-" + r.end_time }}</b
                              >
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
      name: "",
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

      proba: {
        value1: [],
        value2: [],
      },
      termin_id: null,
      table_name: "",
      restaurant_id: null,
      start_time: "",
      end_time: "",
      test: true,
      br: 0,
      selected: null,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      day: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
        .split("-")[2],
      month: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
        .split("-")[1],
      year: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
        .split("-")[0],
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
        //console.log("daj mi resturan: ", res.data.result);
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
            id: this.restaurants.restaurant_id,
          },
        });

        //console.log("daj mi restauran tables: ", res.data);
        this.tables = res.data.result;
        this.groupedTables = this.groupTablesBySize(this.tables);
        this.groupedReservations = this.groupTablesBySizeAndName(
          this.reservations
        );

        //console.log("ta stvar: ", this.groupedReservations);
      } catch (error) {
        console.log("error za restoran tables: ", error);
      }
    },

    async getRestaurantTermins() {
      try {
        let res = await Service.get("/restaurant/termins", {
          params: {
            email: this.email,
            id: this.restaurants.restaurant_id,
          },
        });

        this.termins = res.data.result;
        //console.log("daj mi restauran termins: ", this.termins);
      } catch (error) {
        console.log("error za restoran termins: ", error);
      }
    },

    setDay() {
      let temp = this.picker.split("-");
      this.day = this.picker.split("-")[2];
      this.month = temp[1];
      this.year = temp[0];
      console.log("dan: ", this.day, this.month, this.year);

      this.getReservations();
    },
    async getReservations() {
      try {
        let res = await Service.get("/restaurant/reservations", {
          params: {
            email: this.email,
            id: this.restaurants.restaurant_id,
            day: this.day,
            month: this.month,
            year: this.year,
          },
        });

        this.reservations = res.data.result;
        this.groupedReservations = this.groupTablesBySizeAndName(
          this.reservations
        );
        //console.log("daj mi restauran reservations: ", this.reservations);
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
    },
    applyFilterTermin(item1, item2) {
      let temp = item1 + "-" + item2;

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

    chooseTermin(termin_id, table_id, restaurant_id, start_time, end_time) {
      this.termin_id = termin_id;
      this.table_id = table_id;
      this.restaurant_id = restaurant_id;
      this.start_time = start_time;
      this.end_time = end_time;
      console.log("Chosen termin_id: ", this.termin_id);
      console.log("Chosen table_id: ", this.table_id);
      console.log("Chosen restaurant_id: ", this.restaurant_id);
      console.log("Current user: ", this.currentUser.id);
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      console.log("current date: ", today.toLocaleDateString());
    },
    async reserveTable() {
      if (this.termin_id != null) {
        if (this.currentUser.role == "user") {
          try {
            let res = await Service.post("/add/pending", {
              restaurant_id: this.restaurant_id,
              name: this.currentUser.firstname,
              user_id: this.currentUser.id,
              table_id: this.table_id,
              termin_id: this.termin_id,
              day: this.day,
              month: this.month,
              year: this.year,
              date_time: new Date().toISOString(),
            });

            console.log("napravi rezervaciju res: ", res);
          } catch (error) {
            console.log(error.response);
          }
        } else {
          if (this.name != "") {
            try {
              let res = await Service.post("/add/pending", {
                restaurant_id: this.restaurant_id,
                name: this.name,
                user_id: this.currentUser.id,
                table_id: this.table_id,
                termin_id: this.termin_id,
                day: this.day,
                month: this.month,
                year: this.year,
                date_time: new Date().toISOString(),
              });

              console.log("napravi rezervaciju res: ", res);
            } catch (error) {
              console.log(error.response);
            }
          } else {
            console.log("UNESI IME!");
          }
        }
      } else {
        console.log("Please choose termin");
      }
      this.$router.go();
    },



    changeColor(event) {
      const elements = document.querySelectorAll(".termin-item");
      elements.forEach((element) => {
        element.classList.remove("active");
      });
      const target = event.currentTarget;
      target.classList.add("active");
    },

    removeChosenTermin() {
      this.termin_id = null;
      this.table_id = null;
      this.restaurant_id = null;
      this.start_time = "";
      this.end_time = "";
      const elements = document.querySelectorAll(".termin-item");
      elements.forEach((element) => {
        element.classList.remove("active");
      });
    },
  },

  mounted() {
    //console.log("id od restorana: ", this.$route.params.id);
    this.getRestaurant();
    console.log("user ROLE: ", this.currentUser.role);
  },
};
</script>

<style scoped>
.active {
  background-color: #1e90ff !important;
}
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
  padding: 10px;
  padding-bottom: 0px;
}
.card {
  display: flex;
  background-color: transparent;
  font-size: 20px;
  border-radius: 10px;
}
.one-table {
  background: #333333;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  display: flex;
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
  width: 91%;
}

.termin-item {
  background-color: #636363;
  padding: 8px 15px;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
}
.termin-item:hover {
  background-color: #8b8b8b;
}

.button {
  color: white;
  background-color: #4bb543;
  cursor: pointer;
  width: 90px;
  padding: 5px 10px;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
}
.selected-termin {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.choose-date {
  display: flex;
  justify-content: flex-start;
}
.date-picker {
  color: white;
  font-size: 25px;
  background: #464646;
  padding: 6px 20px 6px 20px;
  border-radius: 10px;
}
</style>
