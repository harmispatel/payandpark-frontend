import React from "react";
import { useLocation  } from "react-router-dom";  
import { Layout, Image } from "antd";
import Login from "../Login";
import Register from "../Register";
import LanguageSelect from "./LanguageSelect";
import Helpimage from "../../assets/img/help.png";

const { Content } = Layout;

const SidebarWithoutNav = () => {
    const location = useLocation();
    let getcurrent = location.pathname;
  return (
    <Layout>
          <Content style={{ position: 'relative' }}>
            <div className="site-layout-background">
                {getcurrent == "/register" ? <Register /> : <Login />}   
            </div>
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
              <LanguageSelect />
            </div>
            <div style={{ position: 'absolute', bottom: 20, right: 50 }}>
              <img src={Helpimage} alt="Help" />
            </div>
          </Content>
    </Layout>
  );
};
export default SidebarWithoutNav;
