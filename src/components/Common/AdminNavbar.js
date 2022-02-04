import { useLocation } from 'react-router-dom';
import { Layout, Menu, Link } from "antd";
import AuthService from "../../services/auth.service";

function logOut() {
    AuthService.logout();
    window.location.href="/login";
}

const { Header } = Layout;

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    return (
        <Header className="header">
            <div className="logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            style={{ float: "right" }}
            defaultSelectedKeys={["1"]}
            >
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2" onClick={logOut}>Logout</Menu.Item> 
            </Menu>
        </Header>
    );
}
