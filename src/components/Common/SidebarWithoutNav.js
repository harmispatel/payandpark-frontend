import React from "react";
import { useLocation  } from "react-router-dom";  
import { Layout, Menu } from "antd";
import Login from "../Login";
import Register from "../Register";

const { Header, Content, Sider } = Layout;

const SidebarWithoutNav = () => {
    const location = useLocation();
    let getcurrent = location.pathname;
  return (
    <Layout>
          <Content >
            <div className="site-layout-background">
                {getcurrent == "/register" ? <Register /> : <Login />}   
            </div>
          </Content>
    </Layout>
  );
};
export default SidebarWithoutNav;
