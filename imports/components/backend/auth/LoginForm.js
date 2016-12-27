import React, {Component} from 'react';
import classNames from 'classnames';
import {Meteor} from 'meteor/meteor';
import { withRouter, browserHistory } from 'react-router';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  LoremIpsum,
  InputGroup,
  FormControl,
  ButtonGroup,
  ButtonToolbar,
  PanelContainer,
} from '@sketchpixy/rubix';

@withRouter
export default class LoginForm extends Component {
  submit = e => {
    e.preventDefault();
    let email =  ReactDOM.findDOMNode(this.formEmail).value;
    let password =  ReactDOM.findDOMNode(this.formPassword).value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        console.log('err',err)
        this.setState({
          error: err.reason
        });
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    console.log(12345,Meteor.subscribe('userStatus'))
    return (
        <Grid>
            <Row>
            <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                <PanelContainer controls={false}>
                <Panel>
                    <PanelBody style={{padding: 0}}>
                    <div className='text-center bg-darkblue fg-white'>
                        <h3 style={{margin: 0, padding: 25}}>Sign In BrandCaff</h3>
                    </div>
                    <div>
                        <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                        <Form onSubmit={this.submit}>
                            <FormGroup controlId='emailaddress'>
                            <InputGroup bsSize='large'>
                                <InputGroup.Addon>
                                <Icon glyph='icon-fontello-mail' />
                                </InputGroup.Addon>
                                <FormControl autoFocus type='email' ref={(input) => this.formEmail = input}  className='border-focus-blue' placeholder='hey@brandcaff.com' />
                            </InputGroup>
                            </FormGroup>
                            <FormGroup controlId='password'>
                            <InputGroup bsSize='large'>
                                <InputGroup.Addon>
                                <Icon glyph='icon-fontello-key' />
                                </InputGroup.Addon>
                                <FormControl type='password' ref={(input) => this.formPassword = input}  className='border-focus-blue' placeholder='password' />
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <Grid>
                                <Row>
                                <Col xs={12} collapseLeft collapseRight className='text-center'>
                                    <Button outlined lg type='submit' bsStyle='blue'>Login</Button>
                                </Col>
                                </Row>
                            </Grid>
                            </FormGroup>
                        </Form>
                        </div>
                    </div>
                    </PanelBody>
                </Panel>
                </PanelContainer>
            </Col>
            </Row>
        </Grid>
    );
  }
}
