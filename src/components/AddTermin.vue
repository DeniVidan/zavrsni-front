<template>
  <div id="error" class="error">{{ error }}</div>
  <div class="termin">
    <div class="card-title">Add termin</div>
    <div class="card-lr">
      <div class="left">START</div>
      <div class="right">END</div>
    </div>
    <div v-for="(input, index) in inputs" :key="index">
      <input
        type="time"
        :value="input.value1"
        @input="updateInput(index, 'value1', $event.target.value)"
        placeholder="Start termin"
      />
      <input
        type="time"
        :value="input.value2"
        @input="updateInput(index, 'value2', $event.target.value)"
        placeholder="End termin"
      />
    </div>

    <div class="button">
      <div @click="addInput" class="button-left">ADD TERMIN</div>
      <div @click="createTermin()" class="button-right">CREATE</div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";

export default {
  name: "AddTermin",
  data() {
    return {
      inputs: [{ value1: "", value2: "" }],
      currentUser: Auth.getUser(),
      error: "",
    };
  },
  props: {},
  methods: {
    async createTermin() {
      try {
        for (let i = 0; i < this.inputs.length - 1; i++) {
          if (this.inputs[i].value1 != "" && this.inputs[i].value2 != "") {
            let res = await Service.post("/create/termin", {
              restaurant_id: this.currentUser.id,
              start_time: this.inputs[i].value1,
              end_time: this.inputs[i].value2,
            });
            console.log("daj res termini: ", res);
          } else {
            console.log("nema vise stolova za dodati");
            return;
          }
        }
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },

    addInput() {
      const lastInput = this.inputs[this.inputs.length - 1];
      if (lastInput.value1 !== "" && lastInput.value2 !== "") {
        document.getElementById("error").style.backgroundColor = "#4BB543";
        this.error = "Table added successfully";
        this.inputs.push({ value1: "", value2: "" });
      } else {
        document.getElementById("error").style.backgroundColor = "#b95555";
        console.log("Please fill out all inputs before adding a new one.");
        this.error = "Please enter termin";
      }
      console.log("samo console.log: ", this.inputs);
      console.log(
        "samo console.log: ",
        this.inputs[this.inputs.length - 1].value1
      );
    },
    updateInput(index, key, value) {
      this.inputs[index][key] = value;
      //console.log("update input: ", this.inputs[index][key])
    },
  },
  computed: {},

  mounted() {
    //console.log("current user id addtermin", this.currentUser.id);
  },
};
</script>

<style scoped>
.termin {
  background-color: #333333;
}
input {
  color: black;
  font-weight: bold;
  background-color: white;
  border: 1px solid #333333;
  width: 134px;
  font-size: 20px;
}
.card-title {
  display: flex;
  flex-direction: row;
  font-size: 23px;
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
.button {
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 22px;
  background-color: #1e90ff;
  cursor: pointer;
}
.button-left {
  width: 50%;
  border-right: 1px solid #333333;
}
.button-right {
  width: 50%;
  border-left: 1px solid grey;
}
::placeholder {
  font-size: 15px;
  color: rgb(112, 112, 112);
  font-weight: bold;
  padding-left: 10px;
}
.error {
  color: white;
  font-size: 15px;
  font-weight: bold;
}
</style>
