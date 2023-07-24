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
      <div class="choose-date">
        <input
          @change="setDay()"
          class="date-picker"
          type="date"
          v-model="picker"
        />
        <v-btn
          style="margin-left: 80px; font-size: 20px; font-weight: bold"
          color="#1e90ff"
          :to="{ name: 'restaurantopen', params: { id: currentUser.id } }"
          >book</v-btn
        >
      </div>

      <div style="">
        <div class="wraper" v-for="(i, group) in groupedTables" :key="i">
          <table class="">
            <div style="font-size: 26px; font-weight: bold">
              {{ group
              }}<img style="padding-left: 7px" :src="chairImg" alt="" />
            </div>
            <tr>
              <th></th>
              <th
                style="padding-left: 15px; padding-right: 15px;"
                v-for="(termin, index) in termins"
                :key="index"
              >

                <div v-if="termin">
                  {{ termin.start_time }} - {{ termin.end_time }}
                </div>
              </th>
            </tr>

            <tr v-for="(table, index) in tables" :key="index">
              <div style="font-size: 20px" v-if="table.table_size == group">
                {{ table.table_name }}
              </div>
              <td
                @click="proba(termin) && proba2"
                style="margin: 20px; background: #464646"
                v-for="(termin, index) in termins"
                :key="index"
              >


              <div v-if="reservations">
                <div
                  class="table-box"
                  v-for="reservation in reservations"
                  :key="reservation"
                >
                  <div
                    class="reservation"
                    v-if="
                      table.id == reservation.table_id &&
                      termin.id == reservation.termin_id &&
                      table.table_size == group
                    "
                  >
                    <div>
                      <div v-if="reservation.firstname">
                        {{ reservation.name }}
                        <img
                          @click="cancelReservation(reservation.reservation_id, reservation.restaurant_id, reservation.user_id, reservation.email, reservation.firstname, reservation.lastname)"
                          style="cursor: pointer; vertical-align: middle;"
                          :src="xsquare"
                          alt=""
                          width="20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Auth, Service } from "../services/services";
import chairImg from "../assets/chair.png";
import xsquare from "../assets/xsquare.png";

export default {
  name: "AdminSchedule",
  data() {
    return {
      currentUser: Auth.getUser(),
      email: Auth.getUserEmail(),
      tableNumber: false,
      chairImg: chairImg,
      tables: [],
      xsquare: xsquare,
      reservations: [],
      groupedTables: {},
      termins: [],
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
    async getReservations() {
      try {
        let res = await Service.get("/reservations", {
          params: {
            day: this.day,
            month: this.month,
            year: this.year,
            email: this.email,
            id: this.currentUser.id,
          },
        });

        this.reservations = res.data.result;
        console.log("daj mi restauran reservations: ", this.reservations);

        /* this.reservations.forEach((element) => {
          console.log(element);
        }); */
      } catch (error) {
        console.log("error za restoran reservations: ", error);
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

        console.log("daj mi restauran tables: ", res.data.result);
        this.tables = res.data.result;
        this.groupedTables = this.groupTablesBySize(this.tables);
        this.termins = this.getTermins(this.tables);
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
    display(picker) {
      console.log(picker);
    },
    setDay() {
      let temp = this.picker.split("-");
      this.day = this.picker.split("-")[2];
      this.month = temp[1];
      this.year = temp[0];
      console.log("dan: ", this.day, this.month, this.year);

      this.getReservations();
    },

    async cancelReservation(id, restaurant_id, user_id, email, firstname, lastname) {
      let res = await Service.delete("/delete/existing/reservation", {
        params: {
          id: id,
          restaurant_id: restaurant_id,
          user_id: user_id, 
          email: email, 
          firstname: firstname, 
          lastname: lastname,
        },
      });

      console.log("delete existing reservation: ", res.status);

      if (res.status == 200) {
          const indexToRemove = this.reservations.findIndex(
            (element) => element.reservation_id === id
          );

          if (indexToRemove !== -1) {
            const removedElement = this.reservations.splice(indexToRemove, 1)[0]; // remove the element and store it in a variable
            console.log(`Removed element with ID ${id}.`);
          } else {
            console.log(`No element found with ID.`);
          }


        } else console.log("nije uspijelo");

    },

    proba(termin) {
      console.log("termin: ", termin);
    },

    proba2(event) {
      console.log(event.target.tagName);
      /* s */
    },
  },

  mounted() {
    this.getRestaurantTables();
    this.getRestaurantTermins();
    this.setDay();
    //console.log("current user: ", this.currentUser.id)
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
.schedule {
  color: white;
  margin-bottom: 100px;
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
  padding: 20px;
  background-color: #313131;
  width: 600px;
  min-width: 400px;
  border-radius: 15px;
}
table th,
td {
  font-size: 20px;
}
table {
  border-collapse: collapse;
}
.choose-date {
  display: flex;
  justify-content: flex-start;
}
.next,
.previous {
  font-weight: bold;
  cursor: pointer;
}

.date-picker {
  color: white;
  font-size: 25px;
  background: #464646;
  padding: 6px 20px 6px 0px;
  border-radius: 10px;
}
</style>
