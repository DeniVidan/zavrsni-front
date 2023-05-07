<template>
  <div class="profile">
    <div @click="goBack()" class="go-back">
      <div class="back-img">
        <font-awesome-icon
          class="icon mr-5"
          icon="fa-reguler fa-chevron-left"
        />
      </div>
      <div class="title ml-5">back</div>
    </div>
    <div class="content">
      <div class="profile-info">
        <!--         <div class="profile-img">
          <div class="overlay">
            <div class="img"><span class="span"></span></div>            
          </div>
        </div> -->
        <div class="profilepic">
          <img
            class="profilepic__image"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            width="170"
            height="170"
            alt="Profile picture"
            ref="profilePic"
          />
          <div @click="openFileExplorer" class="profilepic__content">
            <span class="profilepic__icon"></span>
            <span class="profilepic__text">Edit Profile</span>
          </div>
          <input
            type="file"
            accept="image/*"
            @change="onChange"
            ref="fileInput"
            style="display: none"
          />
        </div>
        <div class="name">
          {{ currentUser.firstname }} {{ currentUser.lastname }}
        </div>
        <div class="email">{{ currentUser.email }}</div>
      </div>
      <div class="error">{{ error }}</div>
      <div class="edit-card">
        <div class="item-title" @click="toggle()">Edit profile</div>
        <div class="slide-conteiner">
          <div class="login-form" v-show="isToggle">
            <label for="">First name</label>
            <input
              v-model="firstname"
              type="text"
              name="firstname"
              placeholder="Enter your firstname"
            />
            <label for="">Last name</label>
            <input
              v-model="lastname"
              type="text"
              name="lastname"
              placeholder="Enter your lastname"
            />
            <label for="">Old password</label>
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="Enter your old password"
            />
            <label for="">New password</label>
            <input
              v-model="newPassword"
              type="password"
              name="password"
              placeholder="Enter your new password"
            />
            <div class="button">
              <div class="" @click="editUserInfo()">submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Service } from "../services/services";
import imageCompression from "browser-image-compression";

export default {
  name: "Profile",
  data() {
    return {
      currentUser: Auth.getUser(),
      token: Auth.getUserToken(),
      firstname: Auth.getUser().firstname,
      lastname: Auth.getUser().lastname,
      email: Auth.getUserEmail(),
      role: Auth.getUserRole(),
      id: Auth.getUser().id,
      password: "",
      newPassword: "",
      isToggle: false,
      error: "",
      changePass: false,
      base64compressed: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    toggle() {
      this.isToggle = !this.isToggle;
    },

    async editUserInfo() {
      try {
        if (this.password == "" && this.newPassword == "") {
          this.changePass = false;
        } else this.changePass = true;

        if (
          this.firstname != Auth.getUser().firstname ||
          this.lastname != Auth.getUser().lastname ||
          this.changePass
        ) {
          console.log("faking id: ", Auth.getUser().id);
          let res = await Service.put("/edit/user", {
            id: Auth.getUser().id,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
            newPassword: this.newPassword,
            token: this.token,
            id: this.id,
          });

          console.log("change user res: ", res);

          if (res.status == 200) {
            let user = {
              token: this.token,
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
              role: this.role,
              id: this.id,
            };

            localStorage.setItem("user", JSON.stringify(user));

            this.$router.go();
          }
        } else {
          this.error = "Please change any fields";
        }
      } catch (error) {
        this.error = "Please change any fields";
        console.log(error);
      }
    },

    openFileExplorer() {
      this.$refs.fileInput.click();
    },
    async onChange(event) {
      try {
        const file = event.target.files[0];

        console.log("originalFile instanceof Blob", file instanceof Blob); // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 480,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          this.base64compressed = reader.result;
          this.$refs.profilePic.setAttribute("src", this.base64compressed);
          console.log("slika: ", this.base64compressed);
        };
      } catch (error) {
        console.log("error compresion: ", error);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@100&family=Open+Sans:wght@300&family=Poppins:wght@100;600&display=swap");
.go-back {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: white;
  font-size: 45px;
  padding: 10px;
  width: 200px;
}
.content {
  margin-top: 70px;
}

.profilepic {
  position: relative;
  margin: auto;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #111;
}

.profilepic:hover .profilepic__content {
  opacity: 1;
}

.profilepic:hover .profilepic__image {
  opacity: 0.5;
}

.profilepic__image {
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}

.profilepic__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}

.profilepic__icon {
  width: 50px;
  height: 50px;
  background: url("@/assets/addphoto.png");
  color: white;
  padding-bottom: 8px;
  cursor: pointer;
}

.profilepic__text {
  text-transform: uppercase;
  font-size: 12px;
  width: 50%;
  text-align: center;
  cursor: pointer;
}

.name {
  color: white;
  font-size: 40px;
  font-weight: bold;
}
.email {
  color: white;
  font-size: 17px;
}
.edit-card {
  margin: 35px auto 35px auto;
  background-color: #333333;
  width: 80%;
  border-radius: 20px;
}
.item-title {
  font-family: "Barlow", sans-serif;
  font-family: "Open Sans", sans-serif;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #b3b3b3;
  text-align: left;
  padding: 10px 0px 10px 20px;
  cursor: pointer;
}
.login-form {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: auto;
  flex-direction: column;
  margin-top: 20px;
  transition: ease-in 2s;
}
.login-form > input {
  background-color: #1a1a1a;
  padding: 15px;
  color: white;
  border-radius: 18px;
}
.login-form > label {
  font-size: 20px;
  font-weight: normal;
  text-align: start;
  color: white;
}
.error {
  color: white;
  background-color: red;
}
.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
}
.button > div {
  background-color: #2e70eb;
  padding: 8px 25px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border-radius: 10px;
}
</style>
