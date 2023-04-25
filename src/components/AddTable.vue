<template>
  <div class="table">
    <div class="error">{{ error }}</div>
    <div class="card-title">Add table</div>
    <div class="add-table-card">
      <div class="card-lr">
        <div class="left">SIZE</div>
        <div class="right">QUANTITY</div>
      </div>
      <div class="card-body">
        <div class="table-size-input">
          <input v-model="size" type="number" placeholder="Enter number" />
        </div>
        <div class="table-quantity-input">
          <input v-model="quantity" type="number" placeholder="Enter number" />
        </div>
      </div>

      <div class="button">
        <div @click="addTable()" class="button-left">ADD TABLE</div>
        <div @click="createTables()" class="button-right">CREATE</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Service, Auth } from "../services/services";

export default {
  name: "AddTable",
  data() {
    return {
      tableData: {
        size: [],
        quantity: [],
      },
      size: null,
      quantity: null,
      error: "",
      currentUser: Auth.getUser(),
    };
  },

  props: {
    tables: Object,
  },
  methods: {
    addTable() {
      if (this.size == null || this.quantity == null) {
        document.getElementsByClassName("error")[0].style.backgroundColor =
          "#b95555";
        this.error = "Fill all the fields";
      } else {
        document.getElementsByClassName("error")[0].style.backgroundColor =
          "#4BB543";
        this.error = "Table added successfully";
        this.tableData.size.push(this.size);
        this.tableData.quantity.push(this.quantity);
        this.size = null;
        this.quantity = null;
        console.log("samo da vidim: ", this.tableData.quantity[0]);
      }
    },
    async createTables() {
      if (this.tableData.size.length == 0) {
        document.getElementsByClassName("error")[0].style.backgroundColor =
          "#b95555";
        this.error = "Please enter at least 1 table";
      } else {
        document.getElementsByClassName("error")[0].style.backgroundColor =
          "#4BB543";
        this.error = "Tables created successfully";
        try {
          for (let j = 0; j < this.tableData.quantity.length; j++) {
            for (let i = 0; i < this.tableData.quantity[j]; i++) {
              let res = await Service.post("/create/tables", {
                restaurant_id: this.currentUser.id,
                name: "",
                size: this.tableData.size[j],
              });
              console.log("create table res: ", res);
              console.log("samo da vidim: ", this.tableData.quantity[0]);
            }
          }
          this.$router.go();
        } catch (error) {
          console.log("create tables error: ", error);
        }
      }
      //console.log(this.tableData.size.length);
    },

    removeTable() {},
  },

  mounted() {
    //console.log("current user id", this.currentUser.id);
  },
};
</script>

<style scoped>
* {
  color: white;
}
.table {
  background-color: #333333;
  width: 268px;
}
.card-title {
  font-size: 23px;
  font-weight: bold;
  padding: 10px;
}
.card-lr {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
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
.card-body {
  padding: 0;
  display: flex;
  flex-direction: row;
}
.table-size-input {
  width: 50%;
}
.table-quantity-input {
  width: 50%;
}
input {
  color: black;
  font-weight: bold;
  width: 100%;
  background: white;
  border: 1px solid #333333;
}
.error {
  color: white;
  font-size: 15px;
  font-weight: bold;
}
::placeholder {
  font-size: 15px;
  color: rgb(112, 112, 112);
  font-weight: bold;
  padding-left: 10px;
}
</style>
