import React, {Component} from 'react';
import {
  Icon,
  Card,
  Badge,
  Dropdown,
  Button,
  Col,
  Row,
  Menu,
  message
} from 'antd';
import {cardStyles, vmCard} from '../../../style/MainStyles';
import {Link} from "react-router-dom";
import {startStopVM, getVDIToken, destroyVM} from '../../../redux/server/Blueprint';
import vmImageH from '../../../style/images/vm.png';
import vmImage from '../../../style/images/vmg.png';
import Popup from 'popup-window';
import { connect } from 'react-redux'

class CloneCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      imgSrc: vmImage,
      vmToken: "",
      popOpen: false,
      win: null
    };
  }

  componentDidMount() {
    if (this.props.status === "\"STOPPED\"") {
      this.setState({status: 'error'})
    } else if (this.props.status === "\"STARTED\"") {
      this.setState({status: 'success'})
    } else {
      this.setState({status: 'processing'})
    }
  }

  launchVM(vmID) {
    var that = this;
    getVDIToken(vmID).then(function (response) {
      if (response !== "Something went wrong.") {
        var w = window.screen.availWidth;
        var h = window.screen.availHeight;
        var message = {
          token: response.token,
          width: w,
          height: h
        };

        var newWindow = window.open("http://129.146.85.80/", "_blank", "toolbar=no, menubar=no,scrollbars=yes,resizable=yes,width=" + window.screen.width + ",height=" + window.screen.height);
        var intervalID = setInterval(function () {
          newWindow.postMessage(message, "*");
        }, 1000);

        //listen to holla back
        window.addEventListener('message', function (event) {
          if (event.data)
            console.log('that shit worked.');
          }
        , false);
        /*that.setState({
          win: new Popup('http://129.146.85.80/?token=' + response.token, {
            name: 'Guac',
            width: screen.width,
            height: screen.height
          })
        });
        that.state.win.open();*/
        that.setState({vmToken: response.token});
        that.setState({popOpen: true});
      }
    });
  }
  handleMouseOver = (e) => {
    this.setState({imgSrc: vmImageH});
  }

  handleMouseOut = (e) => {
    this.setState({imgSrc: vmImage});
  }
  clicked = (e) => {
    var that = this;
    if (e.key === "delete") {
      destroyVM(this.props.vmID);
    } else {
      startStopVM(this.props.vmID, e.key);
    }
    message.loading('Updating VM', 15, this.props.refreshVMS());
    window.setTimeout(function () {
      that
        .props
        .refreshVMS();
    }, 7000);

  }
  render() {
    const vMenu = (
      <Menu onClick={this.clicked}>
        <Menu.Item key="start">
          Start
        </Menu.Item>
        <Menu.Item key="stop">
          Stop
        </Menu.Item>
        <Menu.Item key="delete">
          Destroy
        </Menu.Item>
      </Menu>
    );

    return (
      <Card title={this.props.title} bordered={false} style={vmCard}>
        <img
          onMouseOver={(e) => this.handleMouseOver(e)}
          onMouseOut={(e) => this.handleMouseOut(e)}
          src={this.state.imgSrc}
          onClick={() => {
          this.launchVM(this.props.vmID)
        }}/>
        <br/>
        <div>
          <Badge status={this.state.status} text={this.props.status}/>
          <span style={{
            padding: '0 5px'
          }}></span>
          <Dropdown overlay={vMenu}>
            <a className="ant-dropdown-link" href="#">
              Actions
              <Icon type="down"/>
            </a>
          </Dropdown>
          <div>
            Assigned User: {this.props.user}
          </div>
        </div>
      </Card>

    );
  }
}

// export default CloneCard;

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
    CloneCard
)
