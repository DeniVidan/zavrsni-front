<template>
  <div class="pending">
    <div class="title">
      <h1>Pending</h1>
    </div>
    <div class="content">
<!--       <div class="item" style="background-color: transparent">
        <div class="vertical-align"><b>DATE BOOKED</b></div>
        <div class="vertical-align"><b>TIME BOOKED</b></div>
        <div class="vertical-align"><b>TABLE NAME</b></div>
        <div class="vertical-align"><b>TERMIN</b></div>
        <div class="vertical-align"><b>GUEST</b></div>
        <div class="vertical-align" style="display: flex">
          <b>CONFIRM / DECLINE</b>
        </div>
      </div>
      <div v-if="pending.length == 0">
        <h1>No reservations !</h1>
      </div>
      <div v-if="pending">
        <div
          class="item"
          v-for="p in pending"
          :key="p"
          style="padding: 0px 40px"
        >
          <div class="vertical-align">{{ p.date_time.split("T")[0] }}</div>
          <div class="vertical-align">
            {{
              p.date_time.split("T")[1].split("Z")[0].split(":")[0] +
              " : " +
              p.date_time.split("T")[1].split("Z")[0].split(":")[1]
            }}
          </div>
          <div class="vertical-align">{{ p.table_name }}</div>
          <div class="vertical-align">
            {{ p.start_time + "-" + p.end_time }}
          </div>
          <div class="vertical-align">{{ p.name }}</div>
          <div class="vertical-align" style="display: flex">
            <img
              @click="
                reserveTable(
                  p.pending_id,
                  p.restaurant_id,
                  p.user_id,
                  p.table_id,
                  p.termin_id,
                  p.day,
                  p.month,
                  p.year,
                  p.email,
                  p.start_time,
                  p.end_time,
                  p.name
                )
              "
              class="btn"
              :src="checkmark"
              alt=""
            />
            <img
              @click="rejectReservation(p.pending_id)"
              class="btn"
              :src="xsquare"
              alt=""
            />
          </div>
        </div>

        <table>
          <tr style="display: flex; justify-content: space-around">
            <th><img :src="calendar" alt="" /></th>
            <th><img :src="time" alt="" /></th>
            <th><img :src="table" alt="" /></th>
            <th><img :src="chair2" alt="" /></th>
            <th><img :src="deadline" alt="" /></th>
            <th><img :src="users" alt="" /></th>
            <th>CONFIRM / DECLINE</th>
          </tr>

          <tr v-for="p in pending" :key="p">
            <td
              style="
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px;
                background-color: #333333;
              "
            >
              <div class="vertical-align">{{ p.date_time.split("T")[0] }}</div>
              <div class="vertical-align">
                {{
                  p.date_time.split("T")[1].split("Z")[0].split(":")[0] +
                  " : " +
                  p.date_time.split("T")[1].split("Z")[0].split(":")[1]
                }}
              </div>
              <div class="vertical-align">{{ p.table_name }}</div>
              <div class="vertical-align">{{ p.table_size }}</div>
              <div class="vertical-align">
                {{ p.start_time + "-" + p.end_time }}
              </div>
              <div class="vertical-align">{{ p.name }}</div>
              <div class="vertical-align" style="display: flex">
                <img
                  @click="
                    reserveTable(
                      p.pending_id,
                      p.restaurant_id,
                      p.user_id,
                      p.table_id,
                      p.termin_id,
                      p.day,
                      p.month,
                      p.year,
                      p.email,
                      p.start_time,
                      p.end_time,
                      p.name
                    )
                  "
                  class="btn"
                  :src="checkmark"
                  alt=""
                />
                <img
                  @click="rejectReservation(p.pending_id)"
                  class="btn"
                  :src="xsquare"
                  alt=""
                />
              </div>
            </td>
          </tr>
        </table> -->

        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-center"><img :src="calendar" alt="" /></th>
              <th class="text-center"><img :src="time" alt="" /></th>
              <th class="text-center"><img :src="table" alt="" /></th>
              <th class="text-center"><img :src="chair2" alt="" /></th>
              <th class="text-center"><img :src="deadline" alt="" /></th>
              <th class="text-center"><img :src="users" alt="" /></th>
              <th class="text-center">CONFIRM / DECLINE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in pending" :key="p">
              <td>{{ p.date_time.split("T")[0]}}</td>
              <td>{{ p.date_time.split("T")[1].split("Z")[0].split(":")[0] +
                  ":" +
                  p.date_time.split("T")[1].split("Z")[0].split(":")[1] }}</td>
              <td> {{ p.table_name }} </td>
              <td> {{ p.table_size }} </td>
              <td> {{ p.start_time + "-" + p.end_time }} </td>
              <td> {{ p.name }} </td>
              <td class="text-center">               
                <img
                  @click="
                    reserveTable(
                      p.pending_id,
                      p.restaurant_id,
                      p.user_id,
                      p.table_id,
                      p.termin_id,
                      p.day,
                      p.month,
                      p.year,
                      p.email,
                      p.start_time,
                      p.end_time,
                      p.name
                    )
                  "
                  class="btn"
                  :src="checkmark"
                  alt=""
                />
                <img
                  @click="rejectReservation(p.pending_id)"
                  class="btn"
                  :src="xsquare"
                  alt=""
                />
               </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
<!--   </div> -->
</template>

<script>
import { Auth, Service } from "../services/services";
import checkmark from "../assets/checkmark.png";
import xsquare from "../assets/xsquare.png";
import calendar from "../assets/calendar.png";
import time from "../assets/time.png";
import table from "../assets/table.png";
import deadline from "../assets/deadline.png";
import users from "../assets/users.png";
import chair2 from "../assets/chair2.png";

export default {
  name: "Pending",
  data() {
    return {
      currentUser: Auth.getUser(),
      checkmark: checkmark,
      xsquare: xsquare,
      calendar: calendar,
      time: time,
      table: table,
      chair2: chair2,
      deadline: deadline,
      users: users,
      pending: [],
    };
  },
  methods: {
    async getPending() {
      try {
        let res = await Service.get("/get/pending", {
          params: {
            day: this.day,
            month: this.month,
            year: this.year,
            email: this.email,
            restaurant_id: this.currentUser.id,
          },
        });

        this.pending = res.data.result;
        console.log("daj mi restauran pendings: ", this.pending);

        /* this.reservations.forEach((element) => {
          console.log(element);
        }); */
      } catch (error) {
        console.log("error za restoran pending: ", error);
      }
    },

    async reserveTable(
      pending_id,
      restaurant_id,
      user_id,
      table_id,
      termin_id,
      day,
      month,
      year,
      email,
      start_time,
      end_time,
      name
    ) {
      try {
        let res = await Service.post("/make/reservation", {
          restaurant_id: restaurant_id,
          user_id: user_id,
          table_id: table_id,
          termin_id: termin_id,
          day: day,
          month: month,
          year: year,
          email: email,
          start_time: start_time,
          end_time: end_time,
          name: name,
        });

        let del = await Service.delete("/delete/pending", {
          params: {
            id: pending_id,
          },
        });

        if (del && res) {
          const indexToRemove = this.pending.findIndex(
            (element) => element.pending_id === pending_id
          );

          if (indexToRemove !== -1) {
            const removedElement = this.pending.splice(indexToRemove, 1)[0]; // remove the element and store it in a variable
            console.log(`Removed element with ID ${pending_id}.`);
          } else {
            console.log(`No element found with ID.`);
          }
        } else console.log("nije uspijelo");
        //console.log("napravi rezervaciju res: ", res);
        //console.log("daj delete rezervacije res: ", del);
      } catch (error) {
        console.log(error);
      }

      //this.$router.go()
    },

    async rejectReservation(pending_id) {
      try {
        let res = await Service.delete("/delete/pending", {
          params: {
            id: pending_id,
          },
        });
        if (res) {
          const indexToRemove = this.pending.findIndex(
            (element) => element.pending_id === pending_id
          );

          if (indexToRemove !== -1) {
            const removedElement = this.pending.splice(indexToRemove, 1)[0]; // remove the element and store it in a variable
            console.log(`Removed element with ID ${pending_id}.`);
          } else {
            console.log(`No element found with ID.`);
          }
        } else console.log("nije uspijelo");
      } catch (error) {}
    },
  },
  mounted() {
    this.getPending();
  },
};
</script>

<style scoped>
* {
  color: white;
  text-align: center;
}
.pending {
  margin-bottom: 100px;
}
.title {
  margin-top: -50px;
}
.title > h1 {
  font-size: 40px;
}
.content {
  margin-top: 100px;
}
.item {
  display: flex;
  margin-bottom: 10px !important;
  justify-content: space-evenly;
  background-color: #333333;
  height: 50px;
  width: 100%;
  margin: auto;
  border-radius: 25px;
  font-size: 20px;
}
table {
  display: flex;
  flex-direction: column;
}
.vertical-align {
  align-self: center;
}
.btn {
  cursor: pointer;
}
</style>
