import React, {Component} from 'react';
import logo from '../../../../style/images/logo.png';
import {Form, Icon, Input, Button, Modal, Cascader} from 'antd';
import {setCompartment, getCompartments, getInstances} from '../../../../redux/server/Compartment';
import { connect } from 'react-redux'
const FormItem = Form.Item;
const { TextArea } = Input;

class CompModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compartment: false,
      compVal: 'validating',
      compList: [],
      listSend: null,
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.compartment !== this.state.compartment) {
      this.setState({ compartment: this.props.compartment});
      this.checkComponents();
    }

  }

  componentDidMount() {
    if (this.props.compartment !== this.state.compartment) {
      this.setState({ compartment: this.props.compartment});
      this.checkComponents();
    }
  }

  checkComponents() {
    var that = this;
    getCompartments().then(response => {
      console.log(response);
      if (response !== "Something went wrong.") {
        that.setState({ compList: that.reformatCompartments(response) });
        console.log(that.state.compList);
      }

      if (that.state.compList.length <= 0) {
        that.setState({ compList: [{ label: 'none found', value:'' }] });
      }

      that.setState({ compVal: 'success' });

    }).catch(error => {
      this.setState({compVal: 'error'});
      return '';
    });
  }

  reformatCompartments(comps) {
    var nComps = [];
    var list = [];
    for (var i = 0; i < comps.length; i++){
      var ocid = comps[i].compartment_ocid;
      var k = comps[i].name;
      nComps.push({ value: ocid, label: k });

      var key = ocid;
      var obj = {};
      obj[key] = k;
      list.push(obj);
    }
    this.setState({ listSend: list });

    return nComps;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          setCompartment(values.nickname, values.compartment_ocid).then(a => {
            console.log(a);
            if (a)
              this.setState({compartment: false});
              this.props.refreshOCI(values.nickname);
            }
          );
        }
      });
  }

  compSelected = (e) => {
    var that = this;
    if (e !== 'none found' && e !== '' && this.state.listSend ) {
      var s = this.state.listSend[0][e];
        this.setState({ compartment: false });
        this.props.refreshOCI(s);
    }

  }


  ////
  //for cascader rename array from ocid to value and nick name to label
  //goes under looking for components
  //<Cascader defaultValue={['1']} options={this.state.compList} />
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title="Set Compartment"
        visible={this.state.compartment}
        closable={false}
        footer={null}>
        <Form onSubmit={this.handleSubmit} className="comp-form">
        <FormItem
            label="Looking for compartments"
          hasFeedback
          validateStatus={this.state.compVal}
          help="If none found, please register a compartment below."
          >
        <Cascader defaultValue={['1']} options={this.state.compList} placeholder="Please Select Compartment" onChange={this.compSelected}/>
        </FormItem>
          <FormItem>
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: 'Please input a nickname for your compartment!'
                }
              ]
            })(
              <Input
                placeholder="nickname"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('compartment_ocid', {
              rules: [
                {
                  required: true,
                  message: 'Please input your compartment_ocid!'
                }
              ]
            })(
              <TextArea placeholder="compartment_ocid" rows={3} />
            )}
          </FormItem>
          <FormItem style={{
            float: 'right'
          }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              GO
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CompartmentModal = Form.create()(CompModal);

export default CompartmentModal;
