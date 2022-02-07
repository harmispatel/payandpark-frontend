import axios from "axios";
class AuthService {
  login(email, password) {
    return axios
      .post(`${process.env.REACT_APP_SERVER_URI}`+"/api/v1/auth/login", {
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