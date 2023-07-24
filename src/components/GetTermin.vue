<template>
  <div class="termin">
    <div class="err-msg"> {{ message }} </div>
    <div class="card-title">Manage your termin</div>
    <div class="card-lr">
      <div class="left">START</div>
      <div class="right">END</div>
      <div class="delete-row">Remove</div>
    </div>
    <div class="item" v-for="(termin, index) in termins" :key="index" :class="{ 'overlapping-termin': termin.isOverlapping }">
      <div class="start-time">
        <input
          type="time"
          @input="updateInput(index, 'start_time', $event.target.value)"
          :value="termin.start_time"
          placeholder="Enter name"
        />
      </div>
      <div class="end-time">
        <input
          type="time"
          @input="updateInput(index, 'end_time', $event.target.value)"
          :value="termin.end_time"
          placeholder="Enter name"
        />
      </div>
      <div @click="removeTermin(index, termin.id)" class="close-btn"></div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";

export default {
  name: "GetTermin",
  data() {
    return {
      termins: [],
      email: Auth.getUserEmail(),
      currentUser: Auth.getUser(),
      message: "",
    };
  },
  methods: {
    async getRestaurantTermins() {
      try {
        let res = await Service.get("/restaurant/termins", {
          params: {
            email: this.email,
            id: this.currentUser.id,
          },
        });

        this.termins = res.data.result;

        this.checkOverlap(this.termins);
        console.log("daj mi restauran termins: ", this.termins);
      } catch (error) {
        console.log("error za restoran termins: ", error);
      }
    },

    async removeTermin(index, id) {
      console.log("termin id: ", id);
      try {
        let res = await Service.delete("/delete/termin", {
          params: {
            id: id,
          },
        });

        console.log("termin deletition: ", res);

        this.termins.splice(index, 1);
        this.checkOverlap(this.termins);
      } catch (error) {
        console.log("termin deletition error: ", error);
      }
    },
checkOverlap(termins) {
  // Reset isOverlapping for all termins
  termins.forEach((termin) => {
    termin.isOverlapping = false;
  });

  termins.forEach((termin1, index1) => {
    termins.forEach((termin2, index2) => {
      if (index1 !== index2) {
        const startTime1 = this.getTimeInMinutes(termin1.start_time);
        const endTime1 = this.getTimeInMinutes(termin1.end_time);
        const startTime2 = this.getTimeInMinutes(termin2.start_time);
        const endTime2 = this.getTimeInMinutes(termin2.end_time);

        if (startTime1 < endTime2 && endTime1 > startTime2) {
          termin1.isOverlapping = true;
          termin2.isOverlapping = true;
        }
      }
    });
  });

  const overlapDetected = termins.some((termin) => termin.isOverlapping);

  if (overlapDetected) {
    this.message = "TERMINS ARE OVERLAPPING";
    return true;
  } else {
    this.message = "";
    return false;
  }
},


    getTimeInMinutes(timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      return hours * 60 + minutes;
    },
  },
  mounted() {
    this.getRestaurantTermins();
  },
};
</script>

<style scoped>
.termin {
  width: 330px;
  background-color: #333333;
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
.start-time,
.end-time {
  width: 40%;
}
input {
  color: black;
  font-weight: bold;
  background-color: white;
  border: 1px solid #333333;
  width: 130px;
  padding-left: 10px;
  font-size: 20px;
}
.close-btn {
  background: url("@/assets/close.png") center no-repeat;
  width: 100%;
  cursor: pointer;
}
.err-msg {
  color: black;
  font-weight: bold;
  font-size: 22px;
  background-color: rgb(255, 197, 5);
}
.overlapping-termin {
  border: 2px solid yellow;
}
</style>
