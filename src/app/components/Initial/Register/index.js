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
  Menu,
  Tabs,
  Select,
  Upload,
  message
} from 'antd';
import Login from '../Login';
import AdminConsole from '../../Admin/AdminConsole';
import { connect } from 'react-redux'
import renderIf from 'render-if';

// !ACHTUNG!
// In this worksheet I have left in the Ravello styling and input bars
// HOWEVER
// As Ravello is no longer MVP it will no longer be part of the Redux Calls!
// So that sheet will no longer return anything!
// For looky look purpuse solo!!!

// OLD
// import {registerRavello, registerOCI} from '../../../redux/server/LoginRegister';

import {registerOCI} from '../../../redux/server/LoginRegister';

import {cardStyles, contentStyles, medusa, headStyles} from '../../../style/MainStyles.js';
import { Link, Redirect } from "react-router-dom";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const {Header, Content} = Layout;
const FormItem = Form.Item;



class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      registered: false,
      fileList: [],
      file: null,
      checkregisterocireturn: true,
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.checkregisterocireturn===true){
      console.log('inside checkregisterocireturn === true');
      let a = nextProps.registerocireturn
      if (a === 'OK'){
        console.log('inside nextProps.registerocireturn is === OK');
        //OPEN Q:
        //Can a user maliciously simply set this to true to get registration access somehow?
        this.setState({
          registered: true
        }, ()=>{
          console.log('value of registered before forceUpdate: ', this.state.registered);
          this.forceUpdate();
        })
      }else{
        this.setState({
          registered: false
        }, ()=>{
          console.log('value of registered before forceUpdate: ', this.state.registered);
          this.forceUpdate();
        })
      }
      this.setState({
        checkregisterocireturn: false
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        //if (!err) {
          if (this.state.file !== null) {
            const { fileList } = this.state;
            const formData = new FormData();
            console.log('right before formData block in Register and value of values.userNameo: ', values.userNameo);
            formData.append('username', values.userNameo);
            formData.append('password', values.passwordo);
            formData.append('user_ocid', values.userOcid);
            formData.append('fingerprint', values.fingerprint);
            formData.append('tenancy_ocid', values.tenancyOcid);
            formData.append('region', values.region);
            formData.append('file', this.state.file);
            // console.log(formData.username);
            // console.log(formData.password);
            // console.log(formData.fingerprint);
            // console.log(formData.tenancy_ocid);
            // console.log(formData.region);
            // console.log(formData.file);
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
            }
            this.setState({
              checkregisterocireturn: true
            }, ()=>{
              this.props.registeroci(formData)
            })
            // registerOCI(formData).then(a => {
            //   if (a === 'OK') {
            //     this.setState({ registered: true });
            //   }
            // });
          }

          //ELSE NOTHING
          //WE ARE NO LONGER USING RAVELLO

          // else registerRavello(values.userName, values.password, values.rUserName, values.rPassword).then(a => {
          //   if (a === 'OK') {
          //     this.setState({registered: true});
          //   }
          // });
       // }
      });
  }
  checkOPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkOPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('passwordo')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkRPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('rPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file);
        var ft = file.name.split('.')[1];
        if (ft === 'pem') {
          this.setState({ fileList: [] });
          this.setState({ file: file });
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
          }));
          return false;
        }
      },
      fileList: this.state.fileList,
    };

    return (
      <Layout>
        <Header style={headStyles}>
          <img src={logo} alt="" style={medusa}/>
        </Header>
        <Content style={contentStyles}>
          <Row>
            <Col span={6} offset={9}>
              <Card title="Register" bordered={false} style={cardStyles}>
              <Tabs type="card">
                <TabPane tab="Ravello" key="1">
                <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem>
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
                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Password"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!'
                      }, {
                        validator: this.checkPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Confirm Password"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('rUserName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Ravello username!'
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                      placeholder="Ravello Username"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('rPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Ravello password!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Ravello Password"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('rConfirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your Ravello password!'
                      }, {
                        validator: this.checkRPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Confirm Ravello Password"/>
                  )}
                </FormItem>

                <FormItem>
                  <Button type="primary" htmlType="submit">Register</Button>
                  <div>Or
                    <Link
                      style={{
                      marginLeft: 5
                    }}
                      to="/Login">Login</Link>
                  </div>
                </FormItem>
              </Form>
                </TabPane>
                <TabPane tab="OCI" key="2">
                <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem>
                  {getFieldDecorator('userNameo', {
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
                <FormItem hasFeedback>
                  {getFieldDecorator('passwordo', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Password"/>
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('confirmo', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!'
                      }, {
                        validator: this.checkOPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                      type="password"
                      placeholder="Confirm Password"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('userOcid', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your User OCID!'
                      }
                    ]
                  })(
                    <TextArea placeholder="User OCID" rows={3} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('fingerprint', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your fingerprint!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <TextArea placeholder="Fingerprint" rows={2} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('tenancyOcid', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your User OCID!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <TextArea placeholder="Tenancy OCID" rows={3} />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('region', {
                    rules: [
                      {
                        required: true,
                        message: 'Must pick a region.'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                  })(
                    <Select
                      placeholder="Select a Region"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="us-phoenix-1">us-phoenix-1</Option>
                      <Option value="us-ashburn-1">us-ashburn-1</Option>
                    </Select>
                  )}
                  </FormItem>
                      <FormItem hasFeedback>
                  {getFieldDecorator('upload', {
                    rules: [
                      {
                        required: true,
                        message: 'Please upload private key!'
                      }, {
                        validator: this.checkConfirm
                      }
                    ]
                        })(
                          <div>

                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Upload Private Key
                      </Button>
                    </Upload>
                  </div>
                  )}
                </FormItem>
                <FormItem>
                  <div>
                    <Button type="primary" htmlType="submit">Register</Button>
                  </div>
                  <div>Or
                    <Link
                      style={{
                      marginLeft: 5
                    }}
                      to="/Login">Login</Link>
                  </div>
                </FormItem>
              </Form>
                </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
          {this.state.registered && (<Redirect to='/Login'/>)}
        </Content>
      </Layout>
    );
  }
}

const Register = Form.create()(RegisterForm);

function mapDispatchToProps(dispatch) {
    return({
       registeroci: (e)=>{dispatch(registerOCI(e))},
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
      registerocireturn: state.registerocireturn
    })
}

export default (connect(
    mapStateToProps, mapDispatchToProps)(
    Register
))

// export default Register;
