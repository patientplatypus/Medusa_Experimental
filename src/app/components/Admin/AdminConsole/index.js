import React, {Component} from 'react';
import {
  Icon,
  Card,
  Col,
  Row,
  Badge,
  Menu,
  Dropdown,
  Button,
  Modal,
  message
} from 'antd';
import {cardStyles, vmCard} from '../../../style/MainStyles.js';
import {Link} from "react-router-dom";
import goldImage from '../../../style/images/gold_image.png';
import vmImage from '../../../style/images/vm.png';
import { getBlueprint, getAllVDI } from '../../../redux/server/Blueprint';
import {getInstances, getConsoles} from '../../../redux/server/Compartment';
import GoldCard from '../../Cards/GoldCard';
import CloneCard from '../../Cards/CloneCard';
import CompartmentCard from '../../Cards/CompartmentCard';
import InstanceCard from '../../Cards/InstanceCard';
import CredentialsModal from '../Modals/CredentialsModal';
import CompartmentModal from '../Modals/CompartmentModal';
import { connect } from 'react-redux'
import Q from 'q';

var confirm = Modal.confirm;

class AdminConsole extends Component {
  constructor() {
    super();
    this.state = {
      cardTitle: null,
      colCount: 0,
      vms: null,
      credentials: false,
      compartment: false,
      loginType: 'O',
      compSelected: true,
      instances: null
  }
    this.refreshVMS = this.refreshVMS.bind(this);
    this.getCompInstances = this.getCompInstances.bind(this);
    this.getCredentials = this.getCredentials.bind(this);
  }

  componentDidMount() {
    var that = this;
    //this.setState({ loginType: localStorage.getItem("loginType") });
    console.log(this.state.loginType);
    if (this.state.loginType === 'R') {
      getBlueprint().then(response => {
        if (response)
          this.setState({ cardTitle: response.description });
        if (!response.credentials)
          that.getCredentials().then(a => {
            if (a === 'OK') {
              this.setState({ credentials: false });
            }
          });
        that.refreshVMS();
      }).catch(error => {
        console.log(error);
        return '';
      });
    } else if (this.state.loginType === 'O') {
      that.getCompartment();
    };
  }
  refreshVMS() {
    var that = this;
    getAllVDI().then(function (response) {
      console.log(response);
      that.setState({vms: response});
    });
  }

  getCompartment() {
    this.setState({ compartment: true });
  }

  getCredentials() {
    this.setState({credentials: true});
  }

  noInstances() {
    message.info('No Instances found.', 3);
  }

  getCompInstances(com) {
    this.setState({ compSelected: com });
    this.setState({ cardTitle: com });
    console.log(com);

    var that = this;
    var instance = null;
    getInstances(com).then(response => {
      console.log(response);
        that.setState({ compartment: false });
      getConsoles(com).then(r => {
          instance = Array.from(r);
          if (response[0]['token']) {
            instance = instance.concat(Array.from(response));
          } else if (!response[0]['token'] && instance === 'none') { that.setState({ credentials: true }); }
          that.setState({ instances: instance });
        }).catch(error => {
          return error;
        });

      }).catch(error => {
        return error;
      });
  }

  render() {
    const cols = [];

    if (this.state.cardTitle && this.state.vms) {
      cols.push(
        <Col span={6}>
          <GoldCard title={this.state.cardTitle} refreshVMS={this.refreshVMS} />
        </Col>
      );
      var vms = this.state.vms;
      for (var i = 0; i < vms.length; i++) {
        console.log(vms[i]);
        cols.push(
          <Col span={6}>
            <CloneCard
              title={vms[i].name}
              status={vms[i].status}
              vmID={vms[i].id}
              user={vms[i].assigned_user}
              refreshVMS={this.refreshVMS} />
          </Col>
        );
      }
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
          <CredentialsModal credentials={this.state.credentials} />
        </div>
      );
    } else if (this.state.cardTitle && this.state.vms === {} && !this.state.compSelected) {
      cols.push(
        <Col span={6}>
          <GoldCard title={this.state.cardTitle} refreshVMS={this.refreshVMS} />
        </Col>
      );
      this.noInstances();
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
          <CredentialsModal credentials={this.state.credentials} />
        </div>
      )
    } else if (this.state.cardTitle && this.state.vms) {
      cols.push(
        <Col span={6}>
          <GoldCard title={this.state.cardTitle} refreshVMS={this.refreshVMS} />
        </Col>
      );
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
          <CredentialsModal credentials={this.state.credentials} />
        </div>
      );
    } else if (this.state.cardTitle && !this.state.compSelected) {
      cols.push(
        <Col span={6}>
          <GoldCard title={this.state.cardTitle} refreshVMS={this.refreshVMS} />
        </Col>
      );
      cols.push(
        <Col span={8}>
          <Button type="primary" size="large" loading>
            Looking for Instances
          </Button>
        </Col>
      );
      return (
        <div>
          <Row gutter={12}>
            {cols}
          </Row>
          <CredentialsModal credentials={this.state.credentials} />
        </div>
      );
    } else if (this.state.compartment) {
      console.log(1);
      return (<div>
        <Row gutter={12}>
          {cols}
        </Row>
        <CompartmentModal compartment={this.state.compartment} refreshOCI={this.getCompInstances} />
      </div>
      );

    } else if (this.state.compSelected && !this.state.instances) {
      console.log(2);

      cols.push(
        <Col span={6}>
            <CompartmentCard title={this.state.cardTitle} compartmentOpen={this.state.compartment} getCred={this.getCredentials}/>
        </Col>
      );
      cols.push(
        <Col span={8}>
          <Button type="primary" size="large" loading>
            Looking for Instances
          </Button>
        </Col>
      );

      return (<div>
        <Row gutter={12}>
        {cols}
        </Row>
        <CredentialsModal credentials={this.state.credentials} comp={true} />
      </div>
      );

    } else if (this.state.compSelected && this.state.instances === 'none') {
      console.log(3);

      cols.push(
        <Col span={6}>
            <CompartmentCard title={this.state.cardTitle} compartmentOpen={this.state.compartment} getCred={this.getCredentials} />
        </Col>
      );
      return (<div>
        <Row gutter={12}>
          {cols}
        </Row>
        <CredentialsModal credentials={this.state.credentials} comp={this.state.compartment} />
      </div>
      );

    } else if (this.state.instances) {
      console.log(4);
      cols.push(
        <Col span={6}>
            <CompartmentCard title={this.state.cardTitle} compartmentOpen={this.state.compartment} getCred={this.getCredentials}/>
        </Col>
      );
      var vms = this.state.instances;
      for (var i = 0; i < vms.length; i++) {
        console.log(vms[i]);
        cols.push(
          <Col span={6}>
            <InstanceCard
              title={vms[i].name}
              vmID={vms[i]['token'] ? vms[i]['token'] : vms[i]['ip']}
              t={vms[i]['token'] ? 'vm' : 'c'}
              k={vms[i]['key']}
              refreshOCI={() => this.getCompInstances} />
          </Col>
        );
      }
      return (
        <div>

          <Row gutter={12}>
            {cols}
          </Row>
          <CompartmentModal compartment={this.state.compartment} refreshOCI={() => this.getCompInstances} />
          <CredentialsModal credentials={this.state.credentials} comp={true} />
        </div>
      );
    } else {
      return (
        <Button type="primary" size="large" loading>
          Loading
        </Button>
    );
  }
}
  }

// export default AdminConsole;

function mapDispatchToProps(dispatch) {
    return({
      // signintoserver: (e)=>{dispatch(signupUSER(e))},
      // setthetoken: (e)=>{dispatch(setTOKEN(e))}
      // sendthepost: (e)=>{dispatch(sendPOST(e))},
      // getuserposts: (e)=>{dispatch(userPOSTS(e))}
    })
}

function mapStateToProps(state) {
    return({
      // tokenreturn: state.token,
      // emailreturn: state.email,
      // userpostsreturn: state.retrieveuserposts
    })
}


export default connect(
    mapStateToProps, mapDispatchToProps)(
    AdminConsole
)
