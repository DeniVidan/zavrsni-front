<template>
  <div class="">
    <div class="header">
      <h2>Welcome back to <b>Tonight's Cutlery.</b></h2>
    </div>

    <div class="title">
      <router-link to="/choose"
        ><font-awesome-icon class="icon" icon="fa-reguler fa-chevron-left"
      /></router-link>
      <h1>Verify</h1>
    </div>

    <div class="login-form">
      <div class="error">{{ error }}</div>

      <label for="">Verification code</label>
      <input
        v-model="email"
        type="text"
        name="text"
        placeholder="Enter the code we sent to your email"
      />
      <br />
      <br />
      <div class="login-btn">
        <router-link to="#"
          ><div @click="authUser()" class="button">Login</div></router-link
        >
      </div>
    </div>

    <div class="footer">
      <p>By Continuing you agree to the Terms and Conditions</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {},
  data() {},

  methods: {},

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
  flex-wrap: nowrap;
  color: white;
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
  margin: 60px auto 0px auto;
  padding: 0.5rem;
  width: 100%;
  height: 55px;
  color: white;
  background-color: #1e90ff;
  font-size: 24px;
  border-radius: 18px;
  font-weight: bold;
}

a {
  text-decoration: none !important;
  color: white;
  align-self: center;
}
</style>
