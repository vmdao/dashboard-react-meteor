import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
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

class AccountCreate extends Component {
  state = {
    errors: []
  };
  create = (e) => {
    e.preventDefault();
    let formEmail = ReactDOM.findDOMNode(this.formEmail).value;
    let formActive = ReactDOM.findDOMNode(this.formActive).value;
    let formUsername = ReactDOM.findDOMNode(this.formUsername).value;
    let formFullname = ReactDOM.findDOMNode(this.formFullname).value;
    let formPassword = ReactDOM.findDOMNode(this.formPassword).value;
    console.log(Accounts)
    Accounts.createUser({email: formEmail, fullname: formFullname, username: formUsername, password: formPassword, active: formActive}, (err) => {
      if(err){
         this.setState({
          errors: [].concat(err),
        });
        return;
      } else {
        alert('OK');
        this.setState({ errors: [] });
      }
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
    return (
      <div>
        {errors}
        <Form horizontal onSubmit={this.create}>
          <FormGroup>
            <Col sm={10}>
              <FormGroup controlId="formEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="hey@brandcaff" ref={(input) => this.formEmail = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Active
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="select" ref={(input) => this.formActive = input} >
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
                  <FormControl type="text" placeholder="Minh Dao Vu" ref={(input) => this.formFullname = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formUsername">
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Education, school, trainning" ref={(input) => this.formUsername = input} />
                </Col>
              </FormGroup>
               <FormGroup controlId="formPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Education, school, trainning" ref={(input) => this.formPassword = input} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formSubmit">
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Create
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

export default AccountCreate;
