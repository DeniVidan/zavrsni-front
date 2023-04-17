<template>
  <div class="">
    <div class="header">
      <h2>Welcome to <b>Tonight's Cutlery.</b></h2>
    </div>

    <div class="title">
      <div class="first-title">
        <router-link to="/choose"
          ><font-awesome-icon class="icon" icon="fa-reguler fa-chevron-left"
        /></router-link>
        <h1>Register</h1>
      </div>
      <div class="second-title">
        <div><h2>as</h2></div>
        <div><h2 style="color: #1e90ff">administrator</h2></div>
      </div>
      <div style="margin: 0px 50px 0px 50px; text-align: start;">
        This registration form is exclusively for businesses interested in
        collaborating with us. If you are a <b>user</b>, please proceed to the <u @click="goToLogin()">Login</u> or
       <u @click="goToRegister()">Register</u> page.
      </div>
    </div>

    <div class="login-form">
      <div class="error">{{ error }}</div>
      <div class="fullname">
        <div class="firstname">
          <label for="">First name</label>
          <input
            v-model="firstname"
            type="firstname"
            name="firstname"
            placeholder="Enter your first name"
          />
        </div>
        &nbsp
        <div class="lastname">
          <label for="">Last name</label>
          <input
            v-model="lastname"
            type="lastname"
            name="lastname"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <br />
      <label for="">Email</label>
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />

      <br />

      <label for="">Business name</label>
      <input
        v-model="businessName"
        type="text"
        name="text"
        placeholder="Enter your business name"
      />

      <br />

      <div class="fullname" style="margin-top: 0">
        <div class="firstname">
          <label for="">Restaurant name</label>
          <input
            v-model="restaurant_name"
            type="text"
            name="restaurantname"
            placeholder="Enter restaurant's name"
          />
        </div>
        &nbsp
        <div class="lastname">
          <label for="">Location</label>
          <input
            v-model="location"
            type="location"
            name="location"
            placeholder="Enter restaurant's location"
          />
        </div>
      </div>
      <br />

      <label for="">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />

      <br />
      <label for="">Comfirm password</label>
      <input
        v-model="passwordRepeat"
        type="password"
        name="password"
        placeholder="Enter your password to comfirm"
      />
      <div class="register-btn">
        <router-link to="/register/admin"
          ><div @click="addUser()" class="button">Send</div></router-link
        >
        <div class="additional-links">
          <div class="no-account">
            <router-link to="/login"
              ><u>Already have an account?</u></router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>By Continuing you agree to the Terms and Conditions</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Auth } from "../services/services";

export default {
  name: "RegisterAdmin",
  components: {},
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      businessName: "",
      restaurant_name: "",
      location: "",
      password: "",
      passwordRepeat: "",
      user: [],
      error: "",
    };
  },
  methods: {
    async addUser() {
      this.error = "";
      let result = await Auth.registerAdmin(
        this.firstname,
        this.lastname,
        this.email,
        this.restaurant_name,
        this.location,
        this.password,
        this.passwordRepeat
      );

      console.log("register result: ", result);
      if (result.status == 500) {
        this.error = result.error;
      } else if (result.status == 401) {
        this.error = result.error;
      } else if (result.status == 403) {
        this.error = result.error;
      } else {
        console.log("User registered successfully");
        this.$router.go();
      }
    },
    goToRegister(){
      this.$router.push({path: "/register"})
    },
    goToLogin(){
      this.$router.push({path: "/login"})
    },

  },
  mounted() {},
};
</script>

<style scoped>
h1 {
  font-size: 60px;
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
.error {
  background-color: rgb(185, 85, 85);
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.fullname {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-between;
}
.firstname {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.lastname {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.login-form {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: auto;
  flex-direction: column;
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
.login-form > .fullname > .firstname > input,
.lastname > input {
  background-color: #333333;
  padding: 15px;
  color: white;
  border-radius: 18px;
}
.login-form > .fullname > .firstname > label,
.lastname > label {
  font-size: 20px;
  font-weight: bold;
  text-align: start;
  color: white;
}
.fullname {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.firstname > label,
.lastname > label {
  float: left !important;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 0.56; /* Firefox */
}
.register-btn {
  margin-top: 60px;
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
}
.additional-links,
a {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.349) !important;
  font-size: 13px;
  font-weight: bold;
}

.footer {
  color: rgba(255, 255, 255, 0.342);
  margin-top: 100px;
}
a {
  text-decoration: none;
}
.title {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: white;
}
.first-title {
  display: flex;
  flex-wrap: nowrap;
}
.second-title {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-left: 250px;
}
.second-title > div > h2 {
  font-weight: bolder;
  margin-top: -20px;
  margin-left: 10px;
}
.icon {
  font-size: 50px;
  padding: 0px 50px;
}
a {
  text-decoration: none !important;
  color: white;
  align-self: center;
}
u{
  cursor: pointer;
}
</style>
