import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import {
  Row,
  Col,
  Grid,
  Form,
  Alert,
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel,
} from '@sketchpixy/rubix';

export default class LogoTypeEdit extends Component {
  state = {
    errors: []
  };
  update = (e) => {
    e.preventDefault();
    let formActive = ReactDOM.findDOMNode(this.formActive).value;
    let formPrority = ReactDOM.findDOMNode(this.formPrority).value;
    const data={
      active : formActive,
      prority : formPrority
    }
    let { _id } = this.props.data;
    Meteor.call('logoSuggestOrders.update', _id, data, (err, res) => {
      if (err) {
        this.setState({
          errors: [].concat(err),
        });
        return;
      }
      alert('OK');
      this.setState({ errors: [] });
    });

  }
  render() {
    let errors = this.state.errors.length ?
      (
        <Alert danger dismissible>
          {this.state.errors.map(({ message }, i) => {
            return <div key={i}>{message}</div>
          })}
        </Alert>
      ) : null;
    let data = this.props.data;
    if (!data) return;
    return (
      <div>
        {errors}
        <Form horizontal onSubmit={this.update}>
          <FormGroup>
            <Col sm={10}>
              <FormGroup controlId="formCode">
                <Col componentClass={ControlLabel} sm={2}>
                  Prority
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="0001" defaultValue={data.prority} ref={(input) => this.formPrority = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" >
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" defaultValue={data.active} ref={(input) => this.formActive = input} >
                    <option value="1">On</option>
                    <option value="0">Off</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formSubmit">
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Update
		              </Button>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Form>
      </div >
    );
  }
}

