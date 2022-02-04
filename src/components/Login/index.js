import React, { useEffect, useRef, useState, Fragment,Component } from "react";
import { useHistory,Route,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message, Modal, Row, Col, Alert  } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthService from "../../services/auth.service";
import Logo from '../../assets/img/logo.svg';
import './login.css';

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

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
   
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    //if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        (data) => {
          // console.log(data); 
          // this.props.history.push("/dashboard");
          window.location.href="/dashboard";
          
          // window.location.reload();
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
    // } else {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }
  // ******** Local State ********* //

  // ******** Redux State ********* //

  // ******* useEffects ******** //

  // if (didMountRef.current) {
  render() {
    return (
      <Fragment>
        <Modal
          title="Bitte gib Deine E Mail Adresse ein, um das Passwort zurückzusetzen"
          footer={[
            <Button key="Cancel">stornieren</Button>,
            <Button key="submit" type="primary">
              einreichen
            </Button>,
          ]}
        >
          <Form name="normal_login" className="login-form">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Bitte geben Sie Ihre E-Mail-Adresse ein",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
          </Form>
        </Modal>
        <Row justify="center" className="login-main" align="middle">
          <Col className="loginimg_text" align="center" span={6}>
            <img src={Logo} />
            <h1>Pay and Park</h1>
            <h3 text="red">Steuerung App und Mitgliederausweise</h3>
            {this.state.message != "" ? <Alert style={{ 'margin-bottom': 10 }} message={this.state.message} type="error" showIcon /> : ''}
            <Form name="normal_login" className="login-form" >
            <Form.Item className="login-sighup-btn">
              <Button ><Link to="login">Login</Link></Button>
              <Button ><Link to="register">Register</Link></Button>
            </Form.Item>
              <Form.Item
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                rules={[
                  {
                    required: true,
                    message:
                      "Bitte geben Sie Ihren Benutzernamen oder Ihre E-Mail-Adresse ein",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nutzer"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Bitte geben Sie Ihr Passwort ein",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="Password"
                  placeholder="Passwort"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </Form.Item>
              <Form.Item >
                <label>
                <Input
                  type="checkbox"
                /> Remember Me
                </label>
                <Button className="login-form-forgot pull-left">Passwort vergessen</Button>
              </Form.Item>

              <Form.Item>
                <Button
                  block="true"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleLogin}
                >
                  Anmeldung
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
};
