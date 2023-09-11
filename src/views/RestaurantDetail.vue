<template>
  <div class="container">
    <div class="go-back">
      <div
        @click="goBack()"
        style="height: 65px; display: flex; cursor: pointer"
      >
        <div class="back-img">
          <div class="icon-wraper">
            <font-awesome-icon
              class="icon mr-5"
              icon="fa-reguler fa-chevron-left"
              style="padding-left: 15px"
            />
          </div>
        </div>
        <div class="title ml-5">back</div>
      </div>
    </div>
    <div class="content">
      <div v-if="selected_gallery">
        <v-carousel hide-delimiters v-if="isLoaded">
          <v-carousel-item cover v-for="(image, index) in gallery" :key="index">
            <v-img :src="image" :alt="'Image ' + (index + 1)"></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <!-- <img :src="all_images[0]" /> -->
      <div v-if="selected_review">
        <v-carousel hide-delimiters v-if="isLoaded">
          <v-carousel-item
            cover
            v-for="(image, index) in all_images"
            :key="index"
          >
            <v-img :src="image" :alt="'Image ' + (index + 1)"></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div
        class="choose-review-gallery-photo"
        style="
          display: flex;
          justify-content: space-evenly;
          font-size: 25px;
          color: white;
        "
      >
        <div
          @click="selectedGallery"
          style="width: 50%; text-align: center; cursor: pointer"
          id="gallery-photo-option"
          class="selected"
        >
          RESTAURANT GALLERY
        </div>
        <div
          @click="selectedReview"
          style="width: 50%; text-align: center; cursor: pointer"
          id="review-photo-option"
          class=""
        >
          REVIEW PHOTOS
        </div>
      </div>

      <div
        class="ml-5 mt-2"
        style="
          font-size: 30px;
          display: flex;
          justify-content: space-between;
          color: white;
        "
      >
        <div>
          <h1>
            {{ r.restaurant_name + ", " }}
            <i style="font-weight: normal; font-size: 28px">{{ r.location }}</i>
          </h1>
        </div>

        <v-row justify="end">
          <v-dialog v-model="dialog" width="1024">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="isReviewable"
                style="
                  align-self: center;
                  font-size: 20px;
                  background-color: #1e90ff !important;
                  border-radius: 10px;
                  font-weight: bold;
                  cursor: pointer;
                  margin-right: 30px;
                "
                color="primary"
                v-bind="props"
              >
                ADD REVIEW
              </v-btn>
            </template>
            <v-card style="background-color: rgb(39 39 39)">
              <v-card-title>
                <span class="text-h4" style="color: white">Add review</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <div class="rate">
                        <v-rating
                          id="rating"
                          v-model="new_rate"
                          color="grey"
                          active-color="yellow-accent-4"
                          hover
                          half-increments
                          size="23px"
                        ></v-rating>
                        <pre>{{ rate }} <span style="font-size: 15px; font-weight: normal; color: white" v-if="!r.avg_rate">NOT RATED YET</span></pre>
                      </div>
                    </v-col>
                    <v-col cols="12" style="color: white;">
                      <v-textarea
                        
                        bg-color="#2e2e2e"
                        name="input-7-1"
                        variant="filled"
                        label="Write a review"
                        auto-grow
                        v-model="new_review"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" style="display: flex">
                      <div
                        class="selected-images"
                        v-for="i in selected_images"
                        :key="i"
                      >
                        <img
                          class="profilepic__image"
                          :src="i"
                          width="110"
                          height="110"
                        />
                      </div>
                      <div class="profilepic">
                        <div
                          @click="openFileExplorer"
                          class="profilepic__content"
                        >
                          <img :src="addImage" alt="" />
                          <span class="profilepic__text">Upload image</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          @change="onChange"
                          ref="fileInput"
                          style="display: none"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  style="
                    color: #1e90ff;
                    font-size: 17px;
                    font-weight: bold;
                    margin-right: 100px;
                  "
                  variant="text"
                  @click="clearModal()"
                >
                  Clear
                </v-btn>
                <v-btn
                  style="color: #1e90ff; font-size: 17px; font-weight: bold"
                  variant="text"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  style="
                    color: white;
                    background: #1e90ff;
                    font-size: 17px;
                    font-weight: bold;
                    padding: 10px;
                    width: 100px;
                    height: 45px;
                  "
                  variant="text"
                  @click="makeReview() && (dialog = false)"
                >
                  Review
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <div class="rate" style="color: white">
        <v-rating
          id="rating"
          v-model="r.avg_rate"
          color="grey"
          active-color="yellow-accent-4"
          hover
          half-increments
          size="23px"
          readonly
          @change="makeRating(r.avg_rate)"
        ></v-rating>
        <pre>{{ r.avg_rate }} <span style="font-size: 15px; font-weight: normal;" v-if="!r.avg_rate">NOT RATED YET</span></pre>
      </div>
      <div class="description" style="color: white">
        {{ r.description }}
      </div>
      <div class="review-container" style="color: white">
        <div class="review-button">REVIEWS</div>
        <div class="rate-restaurant"></div>

        <div
          class="review-card"
          v-for="(review, index) in reviews"
          :key="index"
        >
          <div class="user-info">
            <div class="user-image">
              <img :src="review.image" width="50" height="50" alt="" />
            </div>
            <div class="fullname-rate">
              <div>{{ review.firstname + " " + review.lastname }}</div>
              <div class="rate" style="margin: 0">
                <v-rating
                  style="font-size: 12px"
                  id="rating"
                  v-model="review.rate"
                  color="grey"
                  active-color="yellow-accent-4"
                  hover
                  half-increments
                  size="17px"
                  readonly
                ></v-rating>
              </div>
            </div>
          </div>
          <div class="review-text">
            <div style="width: 90%">
              <div class="review-content" id="review-content">
                {{ review.review }}
              </div>

              <div v-if="review.id == last_review">
                <v-textarea
                  label="Edit comment"
                  variant="outlined"
                  style="color: white"
                  v-show="isHidden"
                  type="text"
                  v-if="currentUser.id == review.user_id"
                  v-model="review.review"
                ></v-textarea>
              </div>
            </div>
            <div v-if="review.id == last_review">
              <div
                style=""
                @click="editClicked"
                v-if="review.user_id == currentUser.id"
              >
                <div>
                  <img
                    v-if="isEditable"
                    style="cursor: pointer"
                    :src="editBtn"
                    alt=""
                    @click="isHidden = !isHidden"
                  />
                </div>
                <div>
                  <img
                    v-show="isHidden"
                    :src="checkmark"
                    alt=""
                    style="cursor: pointer"
                    @click="updateReview(review.review, review.id)"
                  />
                </div>
                <div>
                  <img
                    v-show="isHidden"
                    :src="deleteIcon"
                    alt=""
                    style="cursor: pointer"
                    @click="deleteReview(review.id)"
                  />
                </div>
              </div>
              <!-- <div v-if="review.user_id == currentUser.id">update</div> -->
            </div>
          </div>
          <div class="review-images" onload="reviewImage(review.image)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import "slick-carousel";
import { Auth, Service } from "../services/services";
import imageCompression from "browser-image-compression";
import addImage from "../assets/add-image.png";
import arrowRight from "../assets/arrow-right.png";
import arrowLeft from "../assets/arrow-left.png";
import editBtn from "../assets/edit.png";
import checkmark from "../assets/checkmark.png";
import deleteIcon from "../assets/delete.png";

export default {
  name: "RestaurantDetail",
  props: {},
  data() {
    return {
      currentUser: Auth.getUser(),
      r: [],
      reviews: [],
      dialog: false,
      review: "",
      rate: null,
      base64compressed: null,
      currentImage: null,
      addImage: addImage,
      selected_images: [],
      all_images: [],
      gallery: [],
      new_rate: null,
      new_review: "",
      isLoaded: false,
      selected_gallery: true,
      selected_review: false,
      isHidden: false,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      arrowLeft: arrowLeft,
      arrowRight: arrowRight,
      editBtn: editBtn,
      checkmark: checkmark,
      deleteIcon: deleteIcon,
      review_date: "",
      review_time: "",
      res: null,
      last_review: null,
      isEditable: true,
      isReviewable: true,
      items: [
        { id: 1, imageUrl: "https://picsum.photos/900/500" },
        { id: 2, imageUrl: "https://picsum.photos/900/500" },
        { id: 3, imageUrl: "https://picsum.photos/900/500" },
        { id: 4, imageUrl: "https://picsum.photos/900/500" },
      ],
    };
  },

  methods: {
    async getAllRestaurantImages() {
      try {
        let res = await Service.get("/restaurant/images", {
          params: {
            id: this.$route.params.id,
          },
        });

        /*     console.log(
          "daj mi restoran images: ",
          res.data.result[0].images
        ); */
        res.data.result.forEach((element) => {
          //console.log("element: ", element.images[0])
          let temp = [];
          temp.push(JSON.parse(element.images));
          //console.log("Prvi Temp: ", temp[0]);
          if (temp[0].length === 1) {
            //console.log("JEDNAKO JE 1");
            this.all_images.push(temp[0][0]);
          } else {
            //console.log("VECE OD 1");
            temp[0].forEach((element) => {
              //console.log("> 1 ELEMENT: ", element);
              this.all_images.push(element);
            });
          }
          /* this.all_images.push(JSON.parse(element.images))
            console.log("element3: ", this.all_images) */
        });

        //console.log("daj mi restoran images: ", this.all_images);
        if (this.all_images.length > 0) {
          this.isLoaded = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    reviewImage(image) {
      //let temp = JSON.parse(image)
      console.log("invdividual review image: ", image);
    },
    async getGallery() {
      try {
        let res = await Service.get("/get/gallery", {
          params: {
            id: this.$route.params.id,
          },
        });
        res.data.result.forEach((element) => {
          let temp = JSON.parse(element.image);
          temp.forEach((element) => {
            this.gallery.push(element);
          });
        });

        if (this.gallery.length > 0) {
          this.isLoaded = true;
        }
        console.log("gallery: ", this.gallery);
      } catch (error) {
        console.log(error);
      }
      //this.selected_images = this.current_gallery;
    },

    async getUserRatingRestaurant() {
      try {
        let res = await Service.get("/user/restaurant/rating", {
          params: {
            restaurant_id: this.$route.params.id,
            user_id: this.currentUser.id,
          },
        });

        console.log("daj mi review od 1 rest 1 user: ", res.data.result);
        if (res.data.result.length == 0) {
          this.isReviewable = true;
        } else {
          this.review_date =
            res.data.result[res.data.result.length - 1].date_time.split("T")[0];
          this.last_review =
            res.data.result[res.data.result.length - 1].review_id;
          this.review_time = res.data.result[0].date_time
            .split("T")[1]
            .split(".")[0];
          this.res = res.data.result;
          // console.log("res: ", this.res[0].date_time);
          this.checkDate();
          this.checkTime();
          /*           console.log("DATE: ", this.review_date);
          console.log("TIME: ", this.review_time); */
        }

        if (res.data.result.length > 0) {
          this.rate = res.data.result[0].rate;
        }
        if (res.data.result.length > 0) {
          this.review = res.data.result[0].review;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async checkDate() {
      let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
      let currentDate = new Date().toISOString().split("T")[0];
      //console.log("date: ", new Date().toISOString() , res.date_time)
      /* console.log("current date: ", currentDate); */
      console.log("rewiv date: ", this.review_date);
      if (this.review_date != currentDate) {
        // console.log("JESTE");

        this.isReviewable = true;
      } else {
        //console.log("NIJE");
        this.isReviewable = false;
      }
    },
    async checkTime() {
      let currentTime = new Date().toISOString().split("T")[1].split(".")[0];
      let currentDate = new Date().toISOString().split("T")[0];
      let result = this.passedTime(
        new Date().toISOString(),
        await this.res.slice(-1)[0].date_time
      );

      console.log("minutes passed: ", result);
      if (result < 30 && result >= 0) {
        //console.log("usao sam");
        this.isEditable = true;
        return true;
      } else {
        //console.log("dole sam uso");
        this.isEditable = false;
        return false;
      }
    },
    editClicked(event) {
      let groupElement = event.target.closest(".review-text");
      const tableBodyElement = groupElement.querySelector("#review-content");
      console.log("HIDDEN: ", tableBodyElement.classList.contains("hidden"));
      if (!tableBodyElement.classList.contains("hidden")) {
        tableBodyElement.classList.add("hidden");
      } else {
        tableBodyElement.classList.remove("hidden");
      }
    },
    selectedReview(event) {
      let groupElement = event.target.closest(".choose-review-gallery-photo");
      const firstbutton = groupElement.querySelector("#review-photo-option");
      const secontbutton = groupElement.querySelector("#gallery-photo-option");
      //console.log("GIMME: ", firstbutton.classList.contains("selected"));
      if (!firstbutton.classList.contains("selected")) {
        firstbutton.classList.add("selected");
        secontbutton.classList.remove("selected");
      }
      this.selected_review = true;
      this.selected_gallery = false;
    },
    selectedGallery(event) {
      let groupElement = event.target.closest(".choose-review-gallery-photo");
      const firstbutton = groupElement.querySelector("#gallery-photo-option");
      const secontbutton = groupElement.querySelector("#review-photo-option");
      //console.log("GIMME: ", firstbutton.classList.contains("selected"));
      if (!firstbutton.classList.contains("selected")) {
        firstbutton.classList.add("selected");
        secontbutton.classList.remove("selected");
      }
      this.selected_review = false;
      this.selected_gallery = true;
    },
    returnTrueFalse(x) {
      return x;
    },
    passedTime(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInMilliseconds = Math.abs(end - start);
      const minutesPassed = Math.floor(differenceInMilliseconds / (1000 * 60));
      return minutesPassed;
    },
    async makeReview() {
      console.log(this.selected_images);
      try {
        console.log("da vidimo");
        let res = await Service.post("/make/review2", {
          restaurant_id: this.$route.params.id,
          user_id: this.currentUser.id,
          rate: this.new_rate,
          review: this.new_review,
          image: JSON.stringify(this.selected_images),
          time: new Date().toISOString(),
        });

        console.log("daj mi make review: ", res.data.result);
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async updateReview(review, review_id) {
      console.log(this.selected_images);
      try {
        console.log("da vidimo");
        let res = await Service.post("/make/review", {
          restaurant_id: this.$route.params.id,
          user_id: this.currentUser.id,
          /*           rate: this.rate, */
          review: review,
          review_id: review_id,
          /*           image: JSON.stringify(this.selected_images),*/
          time: new Date().toISOString(),
        });

        console.log("daj mi make review: ", res.data.result);
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReview(review_id) {
      try {
        let res = await Service.delete("/delete/review", {
          params: {
            review_id: review_id,
          },
        });

        console.log("daj mi make review: ", res.data.result);
        this.$router.go();
      } catch (error) {
        console.log(error);
      }
    },
    async getReviews() {
      try {
        let res = await Service.get("/reviews", {
          params: {
            id: this.$route.params.id,
          },
        });

        console.log("daj mi reviews: ", res.data.result);
        this.reviews = res.data.result;
      } catch (error) {
        console.log(error);
      }
    },
    async getRestaurant() {
      try {
        let res = await Service.get("/restaurant", {
          params: {
            id: this.$route.params.id,
          },
        });
        //console.log("daj mi resturan: ", res.data.result);
        this.r = res.data.result[0];
      } catch (error) {
        console.log("error za restoran: ", error);
      }
      /*       this.getRestaurantTermins();
      this.getReservations();
      this.getRestaurantTables(); */

      //this.groupTables();
    },
    async getRating() {
      try {
        console.log("dada: ", this.currentUser.id);
        let res = await Service.get("/restaurant/rating", {
          params: {
            restaurant_id: this.$route.params.id,
            user_id: this.currentUser.id,
          },
        });
        console.log("GET RATE: ", res.data.result.length);
        if (res.data.result.length == 0) {
          return true;
        } else {
          /*             const element = document.getElementById("rating");
            element.setAttribute("readonly", ""); */
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async makeRating(rate) {
      if ((await this.getRating()) == true) {
        try {
          let res = await Service.post("/rate", {
            restaurant_id: this.$route.params.id,
            user_id: this.currentUser.id,
            rate: rate,
          });

          console.log("rate res: ", res);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("THIS USER HAS ALREADY RATED THIS RESTAURANT!");
        alert("You have already rated this restaurant!");
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
          //this.$refs.profilePic.setAttribute("src", this.base64compressed);
          this.selected_images.push(this.base64compressed);
          //console.log("slika: ", this.base64compressed);
        };
      } catch (error) {
        console.log("error compresion: ", error);
      }
    },
    clearModal() {
      this.review = "";
      this.currentImage = "";
      this.selected_images = [];
    },
    goBack() {
      this.$router.go(-1);
    },
  },

  mounted() {
    let d = new Date().toISOString();

    console.log(
      "PROBA ZA TIME: ",
      new Date().toISOString().split("T")[1].split(".")[0]
    );
    console.log("PROBA ZA DATE: ", new Date().toISOString().split("T")[0]);
    this.getRestaurant();
    this.getReviews();
    this.getUserRatingRestaurant();
    this.getAllRestaurantImages();
    this.getGallery();
    /*     this.checkDate()
    this.checkTime() */
    /*     $(document).ready(() => {
      $(".slick-carousel").slick();
    }); */

    $(".slick-carousel").slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 1,
      infinite: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: "30px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: "20px",
            slidesToShow: 1,
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.rate {
  display: flex;
  margin-left: 25px;
  margin-bottom: 10px;
  gap: 10px;
}
.rate pre {
  font-weight: bold;
  font-size: 20px;
}
.slider > button > .slick-next {
  z-index: 1 !important;
  right: 68px !important;
}
.slider > button > .slick-prev {
  z-index: 1 !important;
  left: 36px !important;
}
.slider {
  width: 100%;
  height: 100%;
}
.slick-carousel {
  /* Customize carousel styles */
}
.container {
  margin: -30px;
}
.go-back {
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: row;
  /* cursor: pointer; */
  color: white;
  font-size: 45px;
  padding: 25px;
  background-color: transparent; /* For browsers that do not support gradients */
  background-image: linear-gradient(rgba(0, 0, 0, 0.678) 30%, transparent);
  width: 100%;
  height: 150px;
}
.go-back > .title {
  color: white;
  font-weight: normal;
}
.icon-wraper {
  width: 65px;
  height: 65px;
  background-color: #1e90ff;
  border-radius: 100%;
}
.description {
  padding: 0px 20px;
  font-size: 21px;
}
.review-container {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
}
.review-button {
  padding: 10px 20px;
  border-top: 3px solid #1e90ff;
  width: 160px;
  font-size: 28px;
  font-weight: bold;
}
.rate-restaurant {
  display: flex;
  padding: 10px 20px;
  justify-content: flex-end;
  font-size: 28px;
  font-weight: bold;
  width: 100%;
}
.review-card {
  margin-top: 10px;
  margin: 10px 20px;
}
.user-info {
  display: flex;
}
.fullname-rate {
  align-self: center;
  padding-left: 15px;
  font-size: 20px;
}
.user-image > img {
  border-radius: 100%;
  object-fit: cover;
}
.review-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #2b2b2b;
  border-radius: 10px;
  padding: 10px;
}
.profilepic {
  position: relative;
  width: 110px;
  height: 110px;
  overflow: hidden;
  background-color: #a3a3a3;
}

.profilepic__content {
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

  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
}

.profilepic__icon {
  width: 50px;
  height: 50px;
  background: url("@/assets/add-image.png");
  background-repeat: no-repeat;
  color: white;
  padding-bottom: 8px;
  cursor: pointer;
}

.profilepic__text {
  color: black;
  font-size: 12px !important;
  font-weight: bold;

  font-size: 12px;
  width: 50%;
  text-align: center;
  cursor: pointer;
}
.hidden {
  display: none;
}
.selected {
  border-bottom: 3px solid #1e90ff;
}
</style>
