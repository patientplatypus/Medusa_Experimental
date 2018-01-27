import React, {Component} from 'react';
import {
  Icon,
  Card,
  Badge,
  Dropdown,
  Button,
  Popover,
  InputNumber,
  Avatar,
  message
} from 'antd';
import {cardStyles, vmCard, compCard, cardIcon} from '../../../style/MainStyles';
import {Link} from "react-router-dom";
import goldImage from '../../../style/images/gold_image.png';
import { cloneBlueprint, getAllVDI } from '../../../redux/server/Blueprint';
import { connect } from 'react-redux'

var FA = require('react-fontawesome');


const { Meta } = Card;

class CompartmentCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      compartmentOpen: false
    };
  }

  componentWillReceiveProps() {
    if (this.props.compartmentOpen !== this.state.compartmentOpen) {
      this.setState({ compartmentOpen: this.props.compartmentOpen });
    }
  }


  render() {

    return (
      <Card
        style={{vmCard}}
        cover={<FA
                  name='dropbox'
                  style={cardIcon}
                />}
        actions={[<Icon type="key" onClick={() => this.props.getCred()}/>, <Icon type="dropbox" onClick={() => this.setState({compartmentOpen:true})}/>]}
      >
        <Meta
          avatar={<Icon style={{ fontSize: 32}} type="dropbox"/>}
          title={this.props.title}
          description="Compartment"
        />
      </Card>
    );
  }
}

// export default CompartmentCard;


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
    CompartmentCard
)
