import './App.css';
import './StudentDrawerForm'
import {getAllStudents} from "./client";
import React, {useState, useEffect} from "react";
import {
    DesktopOutlined, DownloadOutlined,
    FileOutlined,
    LoadingOutlined,
    PieChartOutlined,
    TeamOutlined, UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Button, Drawer, Empty, Layout, Menu, Radio, Space, Spin, Table} from 'antd';
import StudentDrawerForm from "./StudentDrawerForm";

const { Header, Content, Footer, Sider } = Layout;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    //for the drawer
    const [showDrawer, setShowDrawer] = useState(false);

    //get students data from backend
    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(() => {
        fetchStudents();
    },[])
    const renderStudents = () => {
        if(fetching){
            return <Spin indicator={antIcon} />
        }
        if (students.length <= 0) {
            return <Empty />
        }
        return<>
            <StudentDrawerForm showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
            <Table dataSource={students}
                      columns={columns}
                      bordered
                      title={() =>
                          <Button type="primary" onClick={() => setShowDrawer(!showDrawer)} icon={<UserAddOutlined />} size={"middle"}>
                            Add a new student
                          </Button>}
                      pagination={{
                          pageSize: 50,
                      }}
                      scroll={{
                          y: 240,
                      }}
                      rowKey={(student) => students.id}/>
        </>
    }

    return <Layout
        style={{
            minHeight: '100vh',
        }}
    >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
            <Header
                className="site-layout-background"
                style={{
                    padding: 0,
                }}
            />
            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Info</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    {renderStudents()}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                By Tongxuan Wang @ 2023
            </Footer>
        </Layout>
    </Layout>
}

export default App;
