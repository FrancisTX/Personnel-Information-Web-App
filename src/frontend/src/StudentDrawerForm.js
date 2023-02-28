import {Button, Col, Drawer, Form, Input, Row, Select, Space} from "antd";
import React from "react";
import {addNewStudent} from "./client";

const {Option} = Select;
function StudentDrawerForm({showDrawer, setShowDrawer}) {
    const onClose = () => {
        setShowDrawer(false);
    };

    const onFinish = student => {
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student)
            .then(() => {
                console.log("student added")
            }).catch( err => {
                console.log(err)
            }
        )
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

   return <Drawer
        title= "Add a new students"
        placement={"right"}
        width={720}
        onClose={onClose}
        open={showDrawer}
        extra={
            <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={onClose}>
                    OK
                </Button>
            </Space>
        }>
            <Form layout="vertical"
             onFinishFailed={onFinishFailed}
             onFinish={onFinish}
             hideRequiredMark>
           <Row gutter={16}>
               <Col span={12}>
                   <Form.Item
                       name="name"
                       label="Name"
                       rules={[{required: true, message: 'Please enter student name'}]}
                   >
                       <Input placeholder="Please enter student name"/>
                   </Form.Item>
               </Col>
               <Col span={12}>
                   <Form.Item
                       name="email"
                       label="Email"
                       rules={[{required: true, message: 'Please enter student email'}]}
                   >
                       <Input placeholder="Please enter student email"/>
                   </Form.Item>
               </Col>
           </Row>
           <Row gutter={16}>
               <Col span={12}>
                   <Form.Item
                       name="gender"
                       label="gender"
                       rules={[{required: true, message: 'Please select a gender'}]}
                   >
                       <Select placeholder="Please select a gender">
                           <Option value="MALE">MALE</Option>
                           <Option value="FEMALE">FEMALE</Option>
                           <Option value="OTHER">OTHER</Option>
                       </Select>
                   </Form.Item>
               </Col>
           </Row>
           <Row>
               <Col span={12}>
                   <Form.Item>
                       <Button type="primary" htmlType="submit">
                           Submit
                       </Button>
                   </Form.Item>
               </Col>
           </Row>
            </Form>
        </Drawer>
}

export default StudentDrawerForm;