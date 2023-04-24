<template>
  <div class="">
    <div class="header">
      <h2>Welcome back to <b>Tonight's Cutlery.</b></h2>
    </div>

    <div class="title">
      <router-link to="/choose"
        ><font-awesome-icon class="icon" icon="fa-reguler fa-chevron-left"
      /></router-link>
      <h1>Login</h1>
    </div>

    <div class="login-form">
      <div class="error">{{ error }}</div>

      <label for="">Email</label>
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />
      <br />
      <br />
      <label for="">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      <div class="login-btn">
        <router-link to="#"
          ><div @click="authUser()" class="button">Login</div></router-link
        >
        <div class="additional-links">
          <div class="no-account">
            <router-link to="/register"
              ><u>Don't have an account?</u></router-link
            >
          </div>
          <div class="forgot-password">
            <u>Forgot your password?</u>
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
  name: "LogIn",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async authUser() {
      this.error = "";
      let result = await Auth.login(this.email, this.password);

      console.log("login result: ", result);
      if (result.status == 500) {
        this.error = result.error;
      } else if (result.status == 401) {
        this.error = result.error;
      } else if (result.status == 403) {
        this.error = result.error;
      } else {
        
        console.log("User logged in successfully");
        this.$router.go();
      }
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
  margin: 60px auto 0px auto;
  padding: 0.5rem;
  width: 100%;
  height: 55px;
  color: white;
  background-color: #1e90ff;
  font-size: 24px;
  border-radius: 18px;
  font-weight: bold;
  text-align: center;
}
.additional-links,
a {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.349) !important;
  font-size: 13px;
  font-weight: bold;
}

.footer {
  color: rgba(255, 255, 255, 0.342);
  margin-top: 100px;
  text-align: center;
}
.title {
  padding-top: 20px;
  display: flex;
  flex-wrap: nowrap;
  color: white;
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
</style>
