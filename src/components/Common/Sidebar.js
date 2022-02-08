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

const { Content, Sider } = Layout;

const menuList = [
  { icon: <DashboardOutlined/>, label: 'Dashboard', path: '/dashboard' },
  { icon: <FormOutlined/>, label: 'Admins', path: '/admin' },
  { icon: <TableOutlined/>, label: 'Bookings', path: '/booking' },
  { icon: <ProfileOutlined/>, label: 'Payment and Invoices', path: '/invoice' },
  { icon: <CheckCircleOutlined/>, label: 'Parking/Camping Spots', path: '/parkingspot' },
  { icon: <UserOutlined/>, label: 'Information', path: '/qrgenerator' }
];

const SideBarMenu = () => {
    const location = useLocation();
    let getcurrent = location.pathname;
    let selectedKeys = (getcurrent != "" && getcurrent != "/") ? [getcurrent] : ['/dashboard'];

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
            //console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            //console.log(collapsed, type);
          }}
          style={{ background: "white" }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['/dashboard']} defaultSelectedKeys={selectedKeys}>
            {menuList.map((menuone, key) => (
              <Menu.Item key={menuone.path} icon={menuone.icon}>
                <Link to={menuone.path}>{menuone.label}</Link>
              </Menu.Item>
            ))}
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
