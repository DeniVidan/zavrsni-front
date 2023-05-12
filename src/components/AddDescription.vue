<template>
  <div class="description">
    <div class="error">{{ error }}</div>
    <div class="card-title">Add description</div>
    <div class="add-description-card">
      <div class="card-body">
        <textarea
          class="description-input"
          v-model="description"
          placeholder="Enter description"
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>

      <div class="button">
        <div @click="addDescription()" class="btn">CONFIRM</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Service, Auth } from "../services/services";

export default {
  name: "AddDescription",
  data() {
    return {
      currentUser: Auth.getUser(),
      description: "",
      error: "",
    };
  },

  methods: {
    async addDescription() {
        try {
            let res = await Service.post("/add/description", {
                restaurant_id: this.currentUser.id,
                description: this.description,
            })

            console.log("daj mi addDescription post res: ", res)
        } catch (error) {
            console.log(error)
        }
    },
    async getDescription() {
        try {
            let res = await Service.get("/get/description", {
                params: {
                    restaurant_id: this.currentUser.id,
                }
            })
            if(res) {
                this.description = res.data.result[0].description
            }
            
            console.log("daj mi addDescription get res: ", res.data.result[0].description)
        } catch (error) {
            console.log(error)
        }
    }

  },

  mounted() {
    this.getDescription()
  },
};
</script>

<style scoped>
* {
  color: white;
}
.description {
  background-color: #333333;
}
.card-title {
  font-size: 23px;
  font-weight: bold;
  padding: 10px;
}
.button {
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-weight: bold;
  font-size: 22px;
  background-color: #1e90ff;
  cursor: pointer;
  text-align: center;
}

::placeholder {
  font-size: 15px;
  color: rgb(112, 112, 112);
  font-weight: bold;
  padding-left: 10px;
}
</style>
