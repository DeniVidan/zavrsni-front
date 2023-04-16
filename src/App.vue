<template>
  <nav>
    <div class="navbar" v-if="auth.authenticated">
      <div class="profile">
        <img src="https://picsum.photos/50/50">
        <div style="color: white; font-size: 13px;">{{ getUserEmail }}</div>
      </div>

      <div class="search-bar">
        <div class="search-icon"></div>
        <div class="input"><input v-model="searchItem" type="search" placeholder="Search" /></div>
        <div v-if="searchItem" @click="clearSearchItem()" class="clear-icon"></div>
      </div>

      <div class="logout">
        <font-awesome-icon @click="logout()" icon="sign-out-alt" />
      </div>
    </div>
    <router-view />
  </nav>
</template>

<script>
import { Auth } from "./services/services";

export default {
  name: "App",

  data() {
    return {
      auth: Auth.state,
      getUserEmail: Auth.getUserEmail(),
      searchItem: "",
    };
  },
  methods: {
    logout() {
      Auth.logout();
      console.log("User logged out!");
      this.$router.go();
    },

    clearSearchItem(){
      this.searchItem = ""
    },
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: "Barlow", sans-serif;
  font-family: "Open Sans", sans-serif;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1a1a1a;
}
.navbar {
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.profile > img {
  background-color: white;
  border-radius: 30px !important;
}
.search-bar{
  display: flex;
  flex-wrap: row;
  
  background-color: #333333;
  width: 400px;
  border-radius: 35px;
}
::placeholder {
  color: white;
  opacity: 44%;
  margin-left: 20px !important;
}
.search-icon {
  margin-left: 15px;
  background: url("@/assets/search.png")  left no-repeat;
  width: 40px;
  cursor: pointer;
}
input {
  padding: 15px 0px 15px 0px;
  color: white;
  width: 100%;
}
input:focus {
  outline: none;
}
.input {
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
  width: 100%;
}
.clear-icon {
    margin-right: 15px;
  background: url("@/assets/close.png")  right no-repeat;
  width: 40px;
  cursor: pointer;
}
.logout {
  color: rgb(100, 100, 100);
  font-size: 20px;
  cursor: pointer;
  align-self: center;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
