import React, { useEffect, useRef, useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  FormOutlined,
  TableOutlined,
  DashboardOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Parkingspot from "../../components/Parkingspot";
import Booking from "../../components/Booking";
import Qrgenerator from "../../components/Qrgenerator";

const { Header, Content, Footer, Sider } = Layout;

const SideBarMenu = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ float: "right" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
        </Menu>
      </Header>
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={["3"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              Admins
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined />}>
              Bookings
            </Menu.Item>
            <Menu.Item key="4" icon={<ProfileOutlined />}>
              Payment and Invoices
            </Menu.Item>
            <Menu.Item key="5" icon={<CheckCircleOutlined />}>
              Parking/Camping Spots
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
              Information
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* <Booking /> */}
              <Qrgenerator />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Beyond X Labs GmbH.</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default SideBarMenu;
