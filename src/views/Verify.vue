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
      <div class="error"></div>

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
        <router-link to="#"
          ><div class="button">Verify</div></router-link
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
import axios from "axios";
import { Auth } from "../services/services";

export default {
  name: "Verify",
  components: {},
  data() {
    return {
      code: "",
      auth: Auth
    }
  },

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
</style>
