import React, {Component} from 'react';
import {
  Icon,
  Card,
  Badge,
  Dropdown,
  Button,
  Popover,
  InputNumber,
  message
} from 'antd';
import {cardStyles, vmCard} from '../../../style/MainStyles';
import {Link} from "react-router-dom";
import goldImage from '../../../style/images/gold_image.png';
import {cloneBlueprint, getAllVDI} from '../../../redux/server/Blueprint';
import { connect } from 'react-redux'

class GoldCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clones: 1
    };
  }

  handleCreate = (e) => {
    var that = this;
    console.log(this.state.clones);
    cloneBlueprint(this.state.clones).then(function (r) {
      if (r === 'CREATED') {
        message.loading('Updating VM', 10, that.props.refreshVMS());
        that
          .props
          .refreshVMS();
      }
    });
  }

  changeNum = (value) => {
    this.setState({clones: value});
  }

  render() {
    const content = (
      <div>
        <InputNumber min={1} max={10} defaultValue={1} onChange={this.changeNum}/>
        <Button type="primary" onClick={(e) => this.handleCreate(e)}>Create</Button>
      </div>
    );
    return (
      <Card title={this.props.title} bordered={false} style={vmCard}>
        <img src={goldImage}/>
        <div style={{
          padding: "12px 0 4px"
        }}>
          <Popover content={content} title="How many?" trigger="click">
            <Button type="primary" size="large">Create Instances</Button>
          </Popover>
        </div>
      </Card>
    );
  }
}

// export default GoldCard;


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
    GoldCard
)
