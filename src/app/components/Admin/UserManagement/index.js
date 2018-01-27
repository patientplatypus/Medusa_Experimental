import React, {Component} from 'react';
import {
  Button,
  Table,
  Icon,
  Modal,
  Popover,
  Select
} from 'antd';
import {cardStyles, vmCard} from '../../../style/MainStyles';
import {Link} from "react-router-dom";
import CreateUserModal from '../Modals/CreateUserModal';
import {getAllUsers, assignVM, createUser} from "../../../redux/server/UserAdmin";
import { connect } from 'react-redux'

const confirm = Modal.confirm;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={i.toString(36) + i}>{"VDI_" + i}</Option>
  );
}

const data = [
  {
    key: '1',
    username: 'none',
    email: 'none'
  }
];

const content = (
  <Select
    mode="multiple"
    style={{
    width: '100%'
  }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}>
    {children}
  </Select>
);

class UManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      cuOpen: false
    }
  }

  showDeleteConfirm(uname, uid) {
    confirm({
      title: 'Are you sure delete this User?',
      content: 'Are you sure you want to delete ' + uname + '?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  componentDidMount() {
    this.refreshTable();
  }

  refreshTable() {
    var that = this;
    getAllUsers().then(response => {
      if (response)
        console.log(that);
      that.setState({users: response});
    }).catch(error => {
      console.log(error);
      return '';
    });
  }

  render() {
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: text => <a href="#">{text}</a>
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      }, {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={(e) => {
              this.showDeleteConfirm(record.username, record.key)
            }}>Delete</a>
            <span className="ant-divider">
              /
            </span>

            <Popover content={content} title="Title">
              <a>Associate VM</a>
            </Popover>
          </span>
        )
      }
    ];

    if (this.state.users === []) {
      return (
        <div>
          <Button
            type="danger"
            icon="plus"
            size='large'
            onClick={(e) => {
            this.setState({cuOpen: true});
          }}
            ghost
            style={{
            marginBottom: '20px'
          }}>Create User</Button >
          <Table columns={columns} dataSource={data}/>
          < CreateUserModal open={this.state.cuOpen} refresh={this.refreshTable}/>
        </div>
      );
    }
    if (this.state.users) {
      return (
        <div>
          <Button
            type="danger"
            icon="plus"
            size='large'
            onClick={(e) => {
            this.setState({cuOpen: true});
          }}
            ghost
            style={{
            marginBottom: '20px'
          }}>Create User</Button>
          <Table columns={columns} dataSource={this.state.users}/>
          <CreateUserModal open={this.state.cuOpen} refresh={this.refreshTable}/>
        </div>
      );
    } else
      return (
        <Button type="primary" size="large" loading>
          Loading Users
        </Button>
      );
    }
  }

export default UManagement;
