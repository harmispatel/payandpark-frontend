import React, { Fragment,Component } from "react";
import { useHistory,Route,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input ,Button, Col, Alert, Select, Row   } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthService from "../../services/auth.service";
import Logo from '../../assets/img/logo.svg';
import './register.css';
import { withTranslation } from 'react-i18next';

const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

class RegisterForm extends Component {

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

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Row justify="center" className="register-main" align="middle">
          <Col className="loginimg_text" align="center" span={6}>
            <img src={Logo} />
            <h1>{t('title')}<br/>{t('business_portal')}</h1>
            {this.state.message != "" ? <Alert style={{ 'margin-bottom': 10 }} message={this.state.message} type="error" /> : ''}
            <Form name="normal_login" className="login-form" >
            <Form.Item >
              <Button ><Link to="login">{t('login')}</Link></Button>
              <Button ><Link to="register">{t('register')}</Link></Button>
            </Form.Item>
              <Form.Item  name="title"
                rules={[
                  {
                    required: true,
                    message:
                      "Title is required",
                  },
                ]}
              >
                <Input name="title" value={this.state.title} placeholder={t('camping_parking_ground_name')} onChange={this.handleUserInput}  />
              </Form.Item>

              <Form.Item name="streetName"
                rules={[
                  {
                    required: true,
                    message:
                      "Street name and number is required",
                  },
                ]}
              >
                <Input placeholder={t('street_name_and_number')} name="streetName" value={this.state.streetName} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item name="pincode"
                rules={[
                  {
                    required: true,
                    message:
                      "Pincode is required",
                  },
                ]}
              >
                <Input placeholder={t('zip_code_city')} name="pincode" value={this.state.pincode} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item name="name"
                rules={[
                  {
                    required: true,
                    message:
                      "First/Last name is required",
                  },
                ]}
              >
                <Input placeholder={t('first_last_name')} name="name" value={this.state.name} onChange={this.handleUserInput} />
              </Form.Item>

              <Form.Item name="email"
                rules={[
                  {
                    required: true,
                    message:
                      "Email address please enter",
                  },
                ]}
              >
                <Input placeholder={t('email')}  name="email" onChange={this.handleUserInput} value={this.state.email} />
              </Form.Item>

              <Form.Item  name="phone"
                rules={[
                  { 
                    required: true, 
                    message: 
                      'Please input your phone number!' 
                  }
                ]}
              >
                <Input placeholder={t('phone_number')} name="phone" value={this.state.phone} onChange={this.handleUserInput} addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder={t('password')} name="password" value={this.state.password} onChange={this.handleUserInput} />
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
                <Input.Password placeholder={t('confirm_password')} />
              </Form.Item>
              
              <Form.Item>
                <span className="ant-form-text">{t('by_signing_in')} <Link className="change-anchor" to="">{t('terms_of_use')}</Link> {t('and')} <Link className="change-anchor" to="" >{t('privacy_policy')}</Link></span>
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
export default withTranslation()(RegisterForm);