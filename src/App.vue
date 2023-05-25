<template>
  <nav>
    <div
      class="navbar"
      v-if="auth.authenticated && isProfilePath() && isRestaurantPath()"
    >
      <div class="profile">
        <router-link to="/profile"
          ><img style="object-fit: cover;" :src="currentImage" width="50" height="50"
        /></router-link>
        <div style="color: white; font-size: 13px">{{ getUserEmail }}</div>
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
        <router-link to="/pending" class="navigation-button">
          <img :src="pendingImg" alt="" />
          <span>Pending</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Auth, Service } from "./services/services";
import chairImg from "./assets/chair.png";
import listImg from "./assets/list.png";
import pendingImg from "./assets/pending.png";

export default {
  name: "App",

  data() {
    return {
      currentUser: Auth.getUser(),
      auth: Auth.state,
      getUserEmail: Auth.getUserEmail(),
      searchItem: "",
      getUserRole: Auth.getUserRole(),
      role: null,
      chairImg: chairImg,
      listImg: listImg,
      pendingImg: pendingImg,
      currentImage: null,
    };
  },
  methods: {
    logout() {
      Auth.logout();
      console.log("User logged out!");
      this.$router.go();
    },

    async getImage() {
      try {
        let res = await Service.get("/get/profile/image", {
          params: {
            user_id: this.currentUser.id,
          },
        });
        

        this.currentImage = res.data.result[0].image;
      } catch (error) {
        console.log(error);
      }
    },

    isUser() {
      if (Auth.getUserRole() == "user") {
        this.role = true;
      } else if (Auth.getUserRole() == "admin") {
        this.role = false;
      } else {
        this.$router.push({ path: "/login" });
      }
    },

    isProfilePath() {
      if (this.$route.path == "/profile") {
        return false;
      } else return true;
    },
    isRestaurantPath() {
      if (this.$route.name == "restaurantopen" || this.$route.name == "restaurantdetail") {
        return false;
      } else return true;
    },

  },
  mounted() {
    this.isUser();
    this.getImage()
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
  background: #212121;
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
  background-color: #1a1a1a;
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
