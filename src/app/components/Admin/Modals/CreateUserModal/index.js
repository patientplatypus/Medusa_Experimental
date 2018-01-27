import React, {Component} from 'react';
import logo from '../../../../style/images/logo.png';
import {
  Form,
  Icon,
  Input,
  Button,
  Modal,
  message
} from 'antd';
import {createUser, getAllUsers} from '../../../../redux/server/UserAdmin';
const FormItem = Form.Item;
import { connect } from 'react-redux'

var generatePassword = require('password-generator');

class CreateUserForm extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps() {
    this.setState({open: this.props.open});
  }

  handleSubmit = (e) => {
    var that = this;
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          createUser(values.userName, values.password, values.email).then(a => {
            console.log(a);
            if (a) {
              this.setState({open: false});
              message.loading('Updating Users', 5, function () {});
              that
                .props
                .refresh();
            }
          });
        }
      });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title="New User" visible={this.state.open} footer={null}>
        <Form onSubmit={this.handleSubmit} className="cred-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: 'Please input a username!'
                }
              ]
            })(
              <Input
                prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input an email!'
                }
              ]
            })(
              <Input
                prefix={< Icon type = "mail" style = {{ fontSize: 13 }}/>}
                placeholder="Email"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: generatePassword(12, false),
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Input
                prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                addonAfter={< Icon type = "copy" onClick = {
                (e) => {
                  console.log('copied')
                }
              } />}
                disabled/>
            )}
          </FormItem>

          <FormItem style={{
            float: 'right'
          }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Save
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CreateUserModal = Form.create()(CreateUserForm);

export default CreateUserModal;
