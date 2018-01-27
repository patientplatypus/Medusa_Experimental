import React, {Component} from 'react';
import logo from '../../../../style/images/logo.png';
import {Form, Icon, Input, Button, Modal} from 'antd';
import {setCredentials} from '../../../../redux/server/Blueprint';
import {setRDPCredentials} from '../../../../redux/server/Compartment';
import { connect } from 'react-redux'

const FormItem = Form.Item;


class CredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: false
    }
  }

  componentWillReceiveProps() {
    if (this.props.credentials !== this.state.credentials) {
      this.setState({ credentials: this.props.credentials });
      console.log('cred ' + this.props.credentials);
    }


  }
  componentDidMount() {
    if (this.props.credentials !== this.state.credentials) {
      this.setState({ credentials: this.props.credentials });
      console.log('cred ' + this.props.credentials);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          if (this.props.comp) {
            setRDPCredentials(values.userName, values.password).then(a => {
              console.log(a);
              if (a)
                this.setState({credentials: false});
              }
            );
          } else {
            setCredentials(values.userName, values.password).then(a => {
              console.log(a);
              if (a)
                this.setState({credentials: false});
              }
            );
          }
        }
      });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title="RDP Credentials Needed"
        visible={this.state.credentials}
        closable={false}
        footer={null}>
        <Form onSubmit={this.handleSubmit} className="cred-form">
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
          <FormItem>
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

const CredentialsModal = Form.create()(CredModal);

export default CredentialsModal;
