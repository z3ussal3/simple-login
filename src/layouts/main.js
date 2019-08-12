import React, { useState } from "react";
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './main.css';

const { Header, Sider, Content } = Layout;

const Main = ({ children, location }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    }

    let nav = 1;
    switch (location.pathname) {
        case '/dashboard':
            nav = 2;
            break;
        case '/users':
            nav = 3;
            break;
        default:
            break;
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['' + nav]}>
                    <Menu.Item key="1">
                        <Link to='/'>
                            <Icon type="user" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/dashboard'>
                            <Icon type="user" />
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to='/users'>
                            <Icon type="user" />
                            <span>Users</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: 'red', padding: 0, margin: 0 }}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default withRouter(Main);