<template>
  <div class="">


    <div class="title">
      <div class="return">
      <router-link to="/choose"
        ><font-awesome-icon class="icon" icon="fa-reguler fa-chevron-left"
      /></router-link>
      <h1>Verify Registration</h1>
      </div> <br>
      <div class="description">
        Please enter the <b>code</b> we sent you on e-mail <b>{{auth.getUserEmail()}}</b>
      </div>
    </div>

    <div class="login-form">
      <div class="error">{{ error }}</div>

      <label for="">Verification code</label>
      <input
        v-model="code"
        type="text"
        name="text"
        placeholder="Enter the code we sent to your email"
      />
      <br />
      <br />
      <div class="login-btn">
        <div @click="verify()" class="button">Verify</div>
      </div>
    </div>

    <div class="footer">
      <p>By Continuing you agree to the Terms and Conditions</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { Auth, Service } from "../services/services";

export default {
  name: "Verify",
  components: {},
  data() {
    return {
      code: "",
      error: "",
      auth: Auth,
      currentUser: Auth.getUser()
    }
  },

  methods: {
    async verify () {
      try {
        console.log("current user id: ", this.currentUser)
        let res = await Service.post("/verify/code", {
          email: this.currentUser.email,
          input_code: this.code
        })
        
        console.log("res za verify: ", res)

        if(res.data.result.status == 200) {
          const userLocalStorage = JSON.parse(localStorage.getItem('user'))
          userLocalStorage.verified = 1
          console.log("changed localstorage: ", userLocalStorage)
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.$router.go()

        try {
          console.log("email verify delete: ", this.currentUser.email)
          let del = await Service.delete("/delete/verify/code", {
          params:{
            email: this.currentUser.email
          }
        })

        console.log("daj mi delete verify code res: ", del)
        } catch (error) {
          console.log(error)
        }
        

        } else {
          this.error = "Wrong verification code"
          console.log("krivi code")
        }
      } catch (error) {
        
      }
    }
  },

  mounted() {},
};
</script>

<style scoped>
.home{
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 60px;
  font-weight: bold;
}
h2 {
  text-align: center;
  color: white;
  font-size: 25px;
  font-weight: lighter;
}
h2 > b {
  font-weight: bold;
}
.title {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: white;
}
.description {
  font-size: 23px
}
.return {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row !important;
}
.icon {
  font-size: 50px;
  padding: 0px 50px;
}
.login-form {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  margin: auto;
  flex-direction: column;
  margin-top: 50px;
}
.login-form > input {
  background-color: #333333;
  padding: 15px;
  color: white;
  border-radius: 18px;
}
.login-form > label {
  font-size: 20px;
  font-weight: bold;
  text-align: start;
  color: white;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 0.56; /* Firefox */
}
.button {
  margin: 0px auto 0px auto;
  padding: 0.5rem;
  width: 100%;
  height: 55px;
  color: white;
  background-color: #1e90ff;
  font-size: 24px;
  border-radius: 18px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.footer {
  color: rgba(255, 255, 255, 0.342);
  margin-top: 100px;
}

a {
  text-decoration: none !important;
  color: white;
  align-self: center;
}
.error{
  color: white;
  background-color: rgb(255, 67, 67);
  padding: 0px 0px;
  font-weight: bold;
  text-align: center;
  font-size: 19px;
}
</style>
