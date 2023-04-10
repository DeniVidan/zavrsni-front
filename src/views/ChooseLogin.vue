<template>
  <div class="">
    <div class="front-image">
      <img :src="require(`../assets/logo_transparent3.png`)" alt="">
    </div>

    <h1>Book an appointment at your favorite restourant</h1>

    <div class="choose">
      <div class="login-register">
        <router-link class="button" style="margin-right: 10px" to="/login"> <b>Login</b> </router-link>
        <router-link class="button" style="margin-left: 10px" to="/register"> <b>Register</b> </router-link>
      </div>
      <div>
        <div class="admin-login">Login as administrator</div>
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

export default {
  name: "ChooseLogin",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0px 40px;
}

.front-image {
  margin-top: 35px;
  margin-bottom: 70px;
}

.button {
  margin: auto;
  width: 30%;
  padding: 15px 0px;
  color: white;
  background-color: #1e90ff;
  font-size: 24px;
  border-radius: 25px;
}
.login-register {
  display: flex;
  margin-top: 50px;
}
.admin-login {
  margin-top: 80px;
  color: rgba(255, 255, 255, 0.452);
  text-decoration: underline;
  font-weight: bold;
}
.footer{
    color: rgba(255, 255, 255, 0.342);
    margin-top: 100px;
}
a {
  text-decoration: none;
}
</style>
