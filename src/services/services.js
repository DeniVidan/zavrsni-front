import axios from "axios";

let ServiceAuth = axios.create({
  baseURL: "http://localhost:3030/api",
  //baseURL: "https://zavrsni-back-production.up.railway.app",
  timeout: 10000,
});

let Service = axios.create({
  baseURL: "http://localhost:3030/api",
  //baseURL: "https://zavrsni-back-production.up.railway.app",
  timeout: 10000,
});

Service.interceptors.request.use((request) => {
  const token = Auth.getUserToken();
  console.log("daj token: ", token);
  try {
    request.headers["Authorization"] = "Bearer " + token;
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      console.log("Interceptor error: ", error.response.status);
      Auth.logout();
    }
  }
);

let Auth = {
  async register(firstname, lastname, email, password, passwordRepeat) {
    if (password != passwordRepeat) {
      return {
        status: 403,
        error: "Passwords do not match",
      };
    } else {
      if (firstname && lastname && email && password && passwordRepeat) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
          if(password.length >= 8) {
                      try {
            let res = await ServiceAuth.post("/add/user", {
              firstname: firstname,
              lastname: lastname,
              email: email,
              role: "user",
              password: password,
              passwordRepeat: passwordRepeat,
            });
            // ovaj if je cisto dok ne radi catch da error pokazuje ko error

            console.log("daj mi res: ", res);
            if (res.status == 200) {
              const user = res.data.result.user;
              console.log("user: ", user);
              localStorage.setItem("user", JSON.stringify(user));
            }
            return {
              status: res.status,
              msg: res.data.msg,
            };
          } catch (err) {
            console.error(err.response.data.err);
            return {
              status: err.response.status,
              error: err.response.data.err,
            };
          }
          } else {
            return {
              status: 801,
              error: "Password must be at least 8 characters"
            }
          }

        } else {
          return {
            status: 800,
            error: "Not valid email form",
          };
        }
      } else {
        console.log("enter all the fields");
        return {
          status: 401,
          error: "Please enter all the fields!",
        };
      }
    }
  },
  async registerAdmin(
    firstname,
    lastname,
    email,
    restaurant_name,
    location,
    password,
    passwordRepeat
  ) {
    if (password != passwordRepeat) {
      return {
        status: 403,
        error: "Passwords do not match",
      };
    } else {
      if (
        firstname &&
        lastname &&
        email &&
        password &&
        passwordRepeat &&
        restaurant_name &&
        location
      ) {
        try {
          let res = await ServiceAuth.post("/add/admin", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            restaurant_name: restaurant_name,
            location: location,
            role: "admin",
            password: password,
            passwordRepeat: passwordRepeat,
          });
          // ovaj if je cisto dok ne radi catch da error pokazuje ko error

          console.log("daj mi res: ", res);
          if (res.status == 200) {
            const user = res.data.result.user;
            console.log("user: ", user);
            localStorage.setItem("user", JSON.stringify(user));
          }
          return {
            status: res.status,
            msg: res.data.msg,
          };
        } catch (err) {
          console.error(err.response.data.err);
          return {
            status: err.response.status,
            error: err.response.data.err,
          };
        }
      } else {
        console.log("enter all the fields");
        return {
          status: 401,
          error: "Please enter all the fields!",
        };
      }
    }
  },

  async login(email, password) {
    if (email && password) {
      try {
        let res = await ServiceAuth.post("/auth/user", {
          email: email,
          password: password,
        });
        // ovaj if je cisto dok ne radi catch da error pokazuje ko error

        console.log("daj mi res: ", res);
        if (res.status == 200) {
          const user = res.data.result;
          console.log("userxxx: ", user);
          localStorage.setItem("user", JSON.stringify(user));
        }
        return {
          status: res.status,
          msg: res.data.msg,
          role: res.data.result.role,
        };
      } catch (err) {
        console.error("error response: ", err.response);
        return {
          status: err.response.status,
          error: err.response.data.err,
        };
      }
    } else {
      console.log("enter all the fields");
      return {
        status: 401,
        error: "Please enter all the fields!",
      };
    }
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log("proba: ", user)
    if (!user) {
      return "nema usera";
    }
    return user;
  },
  getUserToken() {
    let { token } = Auth.getUser();
    return token;
  },
  getUserEmail() {
    //console.log("đuzer: ", Auth.getUser())

    if (Auth.getUser().email != null) {
      //console.log("ima email: ", Auth.getUser().email)
      return Auth.getUser().email;
    } else if (Auth.getUser().email == null) {
      //console.log("nema email: ", Auth.getUser().email)
      return "nema usera";
    }
  },
  getUserRole() {
    let res = Auth.getUser().role;
    //console.log("rola: ", res)
    if (res == null) {
      return "nema usera";
    } else return res;
  },
  authenticated() {
    const user = Auth.getUser();
    if (user && user.token) {
      return true;
    } else return false;
  },

  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Auth, Service, ServiceAuth };
