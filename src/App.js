import React, { Component } from "react";
import AuthService from "./services/auth.service";
import { Button } from "antd";
import routes from "./route/route";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Routes
} from "react-router-dom";
import Sidebar from "./components/Common/Sidebar";
import SidebarWithoutNav from "./components/Common/SidebarWithoutNav";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  // logOut() {
  //   AuthService.logout();
  // }

  render() {
    const { currentUser } = this.state;
   
    return (
      <div>
        {currentUser ? (
          <>
            <Sidebar />
            <div className="App">
              <Routes />
            </div>
          </>
        ) : (
          <>
            <SidebarWithoutNav />
          </>
        )}
      </div>
    );
  }
}

export default App;