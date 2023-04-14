<template>
  <nav>
    <div class="navbar" v-if="auth.authenticated">
      <div class="profile">profile</div>

      <div class="search-bar">
        <input type="search">
      </div>

      <div class="logout">
          <font-awesome-icon @click="logout()" icon="sign-out-alt" />
      </div>

    </div>
    <router-view />
  </nav>
  
</template>

<script>
import {Auth} from "./services/services"
export default {
  name: "App",
  data() {
    return {
      auth: Auth.state,

    }
  },
  methods: {
    logout(){
      Auth.logout()
      console.log("User logged out!")
      this.$router.go();
    }
  },
}
</script>


<style>
#app {
font-family: 'Barlow', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1A1A1A;
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
.navbar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.profile {
  background-color: white;
}
.search-bar > input {
  background-color: white;
}
.logout{
  color: rgb(100, 100, 100);
  font-size: 20px;
  cursor: pointer;
}

</style>
