<template>
  <nav>
    <div class="navbar" v-if="auth.authenticated && isProfilePath()">
      <div class="profile">
        <router-link to="/profile"><img src="https://picsum.photos/50/50" /></router-link> 
        <div style="color: white; font-size: 13px">{{ getUserEmail }}</div>
      </div>

      <div class="search-bar" v-if="role">
        <div class="search-icon"></div>
        <div class="input">
          <input v-model="searchItem" type="search" placeholder="Search" />
        </div>
        <div
          v-if="searchItem"
          @click="clearSearchItem()"
          class="clear-icon"
        ></div>
      </div>

      <div class="logout">
        <font-awesome-icon @click="logout()" icon="sign-out-alt" />
      </div>
    </div>
    <router-view />

    <div class="bottom-nav-wrapper" v-if="!role && auth.authenticated">
      <div class="bottom-navigation">
        <router-link style="width: 20px" to="/tables" class="navigation-button">
          <img :src="chairImg" alt="" />
          <span>Tables</span>
        </router-link>
        <router-link to="/schedule" class="navigation-button">
          <img :src="listImg" alt="" />
          <span>Reservations</span>
        </router-link>
        <router-link to="/settings" class="navigation-button">
          <img :src="pendingImg" alt="" />
          <span>Pending</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Auth } from "./services/services";
import chairImg from "./assets/chair.png";
import listImg from "./assets/list.png";
import pendingImg from "./assets/pending.png";

export default {
  name: "App",

  data() {
    return {
      auth: Auth.state,
      getUserEmail: Auth.getUserEmail(),
      searchItem: "",
      getUserRole: Auth.getUserRole(),
      role: null,
      chairImg: chairImg,
      listImg: listImg,
      pendingImg: pendingImg,
    };
  },
  methods: {
    logout() {
      Auth.logout();
      console.log("User logged out!");
      this.$router.go();
    },

    clearSearchItem() {
      this.searchItem = "";
    },
    isUser() {
      if (Auth.getUserRole() == "user") {
        this.role = true;
      } else if (Auth.getUserRole() == "admin"){
        this.role = false;
      }
      else {
        this.$router.push({path: "/login"})
      }
    },
    
    
    isProfilePath() {
      if(this.$route.path == "/profile"){
        return false
      } else return true
    }


  },
  mounted() {
    this.isUser();
    //console.log("trenutna ruta: ", this.$route.path)
  },
};
</script>

<style scoped>
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
.profile {
  text-align: center;
}
.profile > a > img {
  background-color: white;
  border-radius: 30px !important;
}
.profile > a {
  background-color: transparent !important;
}
.search-bar {
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
  background: url("@/assets/search.png") left no-repeat;
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
  background: url("@/assets/close.png") right no-repeat;
  width: 40px;
  cursor: pointer;
}
.logout {
  color: rgb(100, 100, 100);
  font-size: 20px;
  cursor: pointer;
  align-self: center;
}

.chair {
  background: url("@/assets/chair.png");
  width: 30px;
  cursor: pointer;
}

.bottom-nav-wrapper {
  display: flex;
  justify-content: center;
}
.bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 50%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.navigation-button {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-decoration: none;
  color: #999;
  height: 100%;
  width: 20px;
  padding: 5px;
  transition: color 0.2s ease-in-out;
}

.navigation-button.active,
.navigation-button:hover {
  color: white;
  margin-bottom: 10px;
  background-color: #5f5f5f;
  border-radius: 1000px;
}

.navigation-button i {
  font-size: 20px;
}

.navigation-button span {
  margin-top: 5px;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: white;
  margin-bottom: 10px;
  background-color: #1e90ff;
  border-radius: 30px;
}
</style>
