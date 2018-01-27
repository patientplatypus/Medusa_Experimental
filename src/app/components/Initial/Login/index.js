import React, {Component} from 'react';
import logo from '../../../style/images/logo.png';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Layout,
  Row,
  Col,
  Menu
} from 'antd';
import Register from '../Register';
import AdminNav from '../../Admin/AdminNav';
import {headStyles, cardStyles, contentStyles, medusa, layoutStyles} from '../../../style/MainStyles.js';
import { connect } from 'react-redux'


import {Link, Redirect} from "react-router-dom";
import { checkLoginOCI } from '../../../redux';
const {Header, Content} = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      adminRedirect: false,
      userRedirect: false,
      loginType:'',
      checkloginreturn: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          this.setState({
            checkloginreturn: true
          }, ()=>{
            this.props.checkloginoci({userName: values.userName, password: values.password})
          })
        }
      });
  }

  componentWillReceiveProps(nextProps){
    if(this.state.checkloginreturn===true){
      this.setState({checkloginreturn: false})
      console.log('value of loginreturn in login: ', nextProps.loginreturn);
      let a = nextProps.loginreturn;
      if (a[0] === 'Admin' || a[0] === 'OCIAdmin') {
        console.log('in');
        this.setState({
          loginType: a[1],
          adminRedirect: true
        });
      } else if (a[0] === 'User') {
        this.setState({
          loginType: a[1],
          userRedirect: true
        });
      }
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Layout style={layoutStyles}>
        <Header style={headStyles}>
          <img src={logo} alt="" style={medusa}/>
        </Header>
        <Content style={contentStyles}>
          <Row>
            <Col span={6} offset={9}>
              <Card title="Login" bordered={false} style={cardStyles}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem style={{height:"2.5vh"}}>
                    {getFieldDecorator('userName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your username!'
                        }
                      ]
                    })(
                      <Input
                        prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                        placeholder="Username"/>
                    )}
                  </FormItem>
                  <FormItem style={{height:"2.5vh"}}>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!'
                        }
                      ]
                    })(
                      <Input
                        prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                        type="password"
                        placeholder="Password"/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Login
                    </Button>
                    <div>Or
                      <Link
                        style={{
                        marginLeft: 5
                      }}
                        to="/Register">
                        Register</Link>
                    </div>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
          {this.state.adminRedirect && (<Redirect to='/AdminNav' />)}
          {this.state.userRedirect && (<Redirect to='/UserNav'/>)}
        </Content>
      </Layout>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return({
       checkloginoci: (e)=>{dispatch(checkLoginOCI(e))},
    })
}

function mapStateToProps(state) {
    return({
      loginreturn: state.loginreturn,
    })
}

const Login = Form.create()(LoginForm);

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    Login
))
