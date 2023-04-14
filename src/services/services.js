import axios from "axios";

let ServiceAuth = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

let Service = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

Service.interceptors.request.use((request) => {
    const token = Auth.getUserToken()
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
        try {
          let res = await ServiceAuth.post("/add/user", {
            firstname: firstname,
            lastname: lastname,
            email: email,
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
          console.log("user: ", user);
          localStorage.setItem("user", JSON.stringify(user));
        }
        return {
          status: res.status,
          msg: res.data.msg,
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
    return JSON.parse(localStorage.getItem("user"));
  },
  getUserToken() {
    let { token } = Auth.getUser();
    return token;
  },
  getUserEmail() {
    let { email } = Auth.getUser();
    return email;
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
