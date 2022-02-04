import React, { useEffect, useRef, useState, Fragment } from "react";
import { useHistory, BrowserRouter, Routes, Link, Route,NavLink,useLocation  } from "react-router-dom";  
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  FormOutlined,
  TableOutlined,
  DashboardOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "../Dashboard";
import Footer from "./Footer";
import routelist from "../../route/routelist";

const { Header, Content, Sider } = Layout;

const SideBarMenu = () => {
    const location = useLocation();
    let getcurrent = location.pathname;
  return (
    <Layout>
        <AdminNavbar
            showSidebar={1}
            setShowSidebar={1}
        />
        <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ background: "white" }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to="admin">Admins</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined />}>
              <Link to="booking">Bookings</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ProfileOutlined />}>
              <Link to="invoice">Payment and Invoices</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<CheckCircleOutlined />}>
              <Link to="parkingspot">Parking/Camping Spots</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
                <Link to="qrgenerator">Information</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 370 }}
            >
              {getcurrent == "/" ? <Dashboard /> :
                routelist.map((route, index) => (
                    getcurrent == route.path ?
                   <route.component /> : null
                ))
              }
              
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default SideBarMenu;
