import React, { useEffect, useRef, useState, Fragment,Component } from "react";
import { useHistory,Route,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input,InputNumber ,Button, message, Modal, Row, Col, Alert,Cascader, Select,Checkbox   } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthService from "../../services/auth.service";
import Logo from '../../assets/img/logo.svg';
import './register.css';

// reset form fields when modal is form, closed

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.state = {
      title:"",
      streetName:"",
      pincode:"",
      name:"",
      email: "",
      password: "",
      phone:"",
      loading: false,
      message: "",
    };
  }

  handleSubmit(e) {
    alert(this.state.name);
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.email, this.state.password).then(
      (data) => {
        window.location.href="/dashboard";
      },
      (error) => {
        console.log(error.response.data.body);
        const resMessage =(error.response && error.response.data && error.response.data.body) || error.message || error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
  // ******** Local State ********* //

  // ******** Redux State ********* //

  // ******* useEffects ******** //

  // if (didMountRef.current) {
  render() {
    return (
      <Fragment>
        <Row justify="center" className="register-main" align="middle">
          <Col className="loginimg_text" align="center" span={6}>
            <img src={Logo} />
            <h1>Pay & Park<br/>Business Portal</h1>
            {this.state.message != "" ? <Alert style={{ 'margin-bottom': 10 }} message={this.state.message} type="error" /> : ''}
            <Form name="normal_login" className="login-form" >
            <Form.Item >
              <Button className=""><Link to="login">Login</Link></Button>
              <Button className=""><Link to="register">Register</Link></Button>
            </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Title is required",
                  },
                ]}
              >
                <Input placeholder="Camping/parking ground name" name="title" value={this.state.title} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Street name and number is required",
                  },
                ]}
              >
                <Input placeholder="Street name and number" name="streetName" value={this.state.streetName} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Pincode is required",
                  },
                ]}
              >
                <Input placeholder="Zip code city" name="pincode" value={this.state.pincode} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "First/Last name is required",
                  },
                ]}
              >
                <Input placeholder="First/Last name" name="name" value={this.state.name} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Email address please enter",
                  },
                ]}
              >
                <Input placeholder="Email"  name="email" onChange={this.handleUserInput} value={this.state.email} />
              </Form.Item>

              <Form.Item
                rules={[
                  { 
                    required: true, 
                    message: 
                      'Please input your phone number!' 
                  }
                ]}
              >
                <Input placeholder="Phone Number" name="phone" value={this.state.phone} onChange={this.handleUserInput} addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" name="password" value={this.state.password} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
              
              <Form.Item>
                <span className="ant-form-text">By signing in, you accept our <Link className="change-anchor" to="">Terms of use</Link> and <Link className="change-anchor" to="" >Privacy Policy</Link></span>
              </Form.Item>

              <Form.Item>
                <Button
                  block="true"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleSubmit}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
};
