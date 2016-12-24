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

class LogoEdit extends Component {
  state = {
    errors: []
  };
  update = (e) => {
    e.preventDefault();
    let formCode = ReactDOM.findDOMNode(this.formCode).value;
    let formActive = ReactDOM.findDOMNode(this.formActive).value;
    let formKeyword = ReactDOM.findDOMNode(this.formKeyword).value;
    let formName = ReactDOM.findDOMNode(this.formName).value;
    let { _id } = this.props.style;
    Meteor.call('logos.update', _id, formActive, formName, formKeyword, (err, res) => {
      if (err) {
        this.setState({
          errors: [].concat(err),
        });
        return;
      }
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
    let {logo} = this.props;
    if (!logo) return;
    return (
      <div>
        {errors}
        <Form horizontal onSubmit={this.update}>
          <FormGroup>
            <Col sm={10}>
              <FormGroup controlId="formCode">
                <Col componentClass={ControlLabel} sm={2}>
                  Code
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="0001" defaultValue={logo.code} ref={(input) => this.formCode = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" >
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" defaultValue={logo.active} ref={(input) => this.formActive = input} >
                    <option value="1">On</option>
                    <option value="0">Off</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education" defaultValue={logo.name} ref={(input) => this.formName = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formKeyword">
                <Col componentClass={ControlLabel} sm={2}>
                  Keyword
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education, school, trainning" defaultValue={logo.keyword} ref={(input) => this.formKeyword = input} />
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

export default LogoEdit;
