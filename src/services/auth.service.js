import axios from "axios";
import {API_URL}  from "../config";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/api/v1/auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token && response.data.user) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();